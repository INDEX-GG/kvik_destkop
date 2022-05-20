import {Pool} from "pg"
import axios from "axios";

let toMD5 = require("components/api/MD5")

let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_sign = process.env.STG_SIGN
let payment_reg_url = process.env.STG_PAYMENT_CHECK
let payment_source = process.env.STG_PAYMENT_STATUS

const relevant_actions = {
    2: {
        "description": "Поднятие вверх объявления KVIK",
        "price": 19.00},
    3: {
        "description": "Выделение цветом объявления KVIK",
        "price": 39.00},
    4: {
        "description": "XL объявление KVIK",
        "price": 39.00},
    5: {
        "description": "Комбо продвижение KVIK",
        "price": 59.00}
}

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            let body = req.body
            let now = new Date()
            let day_in_ms = 1000*60*60*24
            let active_time = new Date(Math.floor(now) + day_in_ms*7)

            let create_callback = await pool.query(`INSERT INTO "payments"."callbacks" ("query", "time", "source") VALUES ($1, $2, $3) RETURNING "id"`, [body, now, payment_source])
            let callback_id = create_callback.rows[0].id

            let callback_body_id = body.id
            let callback_body_sum = body.sum
            let callback_body_client_id = body.clientid
            let callback_body_order_id = body.orderid
            let check_key = toMD5(callback_body_id.toString() + callback_body_sum.toString() + callback_body_client_id.toString() + callback_body_order_id.toString() + payment_sign)
            if ( check_key !== body.key ) {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Ошибка проверки подписи", callback_id])
                throw "err 1"
            }

            let transaction = await pool.query(`SELECT * FROM "payments"."transactions" WHERE "order_number" = $1 AND "source" = $2`, [callback_body_order_id, payment_source])
            if (transaction.rows.length !== 1) {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Транзакция не была найдена, или mdOrder не уникален", callback_id])
                throw "err 2"
            } else if (transaction.rows[0].status_transaction === "paid") {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Сообщение об оплате уже было записано", callback_id])
                throw "err 3"
            }

            let payment_id = transaction.rows[0].order_id
            let payment_reg_answer = await axios.get(payment_reg_url,
                {
                    params: {id: payment_id},
                    auth: {username: payment_login, password: payment_pass},
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(r => r.data)
            let check_status = payment_reg_answer.status
            let check_payment_answer = JSON.stringify(payment_reg_answer)

            if (
                check_status.toString() === "paid" &&
                callback_body_client_id.toString() === transaction.rows[0].user_id.toString() &&
                (new Set([
                    parseFloat(callback_body_sum).toFixed(2),
                    parseFloat(transaction.rows[0].amount).toFixed(2),
                    parseFloat(payment_reg_answer.pay_amount).toFixed(2)
                ])).size === 1
            ) {

                let actions = [...new Set(transaction.rows[0].actions)]
                let amount = transaction.rows[0].amount
                let user_id = transaction.rows[0].user_id
                let post_id = transaction.rows[0].post_id

                // / Здесь включается функция Транзакция + запись о оплате
                // / Кошелек
                if (actions.includes(0) && actions.length === 1) {
                    await pool.query(`BEGIN`)
                    await pool.query(`UPDATE "payments"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_id" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, callback_body_id, payment_source])
                    await pool.query(`INSERT INTO "payments"."transactions_virtual_rubles" ("amount", "description", "date") VALUES ($1, $2, $3)`, [amount, "Пополнение кошелька", now])
                    await pool.query(`UPDATE "public"."users" SET "virtual_rubles_balance" = "virtual_rubles_balance" + $1 WHERE id =$2`, [amount, user_id])
                    // Bonus Transaction
                    // Bonus Update
                    await pool.query(`COMMIT`)

                // / Оплата услуг
                } else {

                    actions.forEach(element => {if (typeof element !== 'number' || element <= 0  || ! (Object.keys(relevant_actions).map(key => parseInt(key))).includes(element)) {throw "Er 4"}});
                    await pool.query(`BEGIN`)
                    if ( actions.includes(2) ) { await pool.query(`UPDATE "public"."posts" SET "rotation_date" = $1 WHERE "id" = $2`, [now, post_id]) }
                    if ( actions.includes(3) ) { await pool.query(`UPDATE "public"."posts" SET "color_selection" = $1 WHERE "id" = $2`, [active_time, post_id]) }
                    if ( actions.includes(4) ) { await pool.query(`UPDATE "public"."posts" SET "size_selection" = $1 WHERE "id" = $2`, [active_time, post_id]) }
                    if ( actions.includes(5) ) { await pool.query(`UPDATE "public"."posts" SET "rotation_date" = $1, "color_selection" = $2, "size_selection" = $2 WHERE "id" = $3`, [now, active_time, post_id]) }
                    await pool.query(`UPDATE "payments"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_number" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, callback_body_order_id, payment_source])

                    await pool.query(`COMMIT`)


                }

            } else {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Не пройдена проверка getOrderStatusExtended", callback_id])
                throw "err 5"
            }
            return "OK " + toMD5(callback_body_id.toString() + payment_sign).toString()

        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api pay/callback ${error}`)
            res.status(400).json({ message: 'NOT OK'})
        }
        finally {
            await pool.end()
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}