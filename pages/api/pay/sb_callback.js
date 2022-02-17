import {Pool} from "pg"
import qs from "qs";
import axios from "axios";
import CryptoJS from "crypto-js";


let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_reg_url = process.env.STG_PAYMENT_CHECK
let payment_source = process.env.STG_PAYMENT_STATUS

const relevant_actions = {
    2: {
        "description": "Поднятие вверх объявления KVIK",
        "price": 1900},
    3: {
        "description": "Выделение цветом объявления KVIK",
        "price": 3900},
    4: {
        "description": "XL объявление KVIK",
        "price": 3900},
    5: {
        "description": "Комбо продвижение KVIK",
        "price": 5900}
}

function check_sum(body) {
    let check_string = ""
    const check_sum_value = body.checksum
    delete body.checksum
    delete body.sign_alias
    let keys = Object.keys(body)
    keys.sort()
    keys.forEach(element =>
    {check_string += element + ";"
    check_string += body[element] + ";"})
    let encrypt_string = CryptoJS.HmacSHA256(check_string, process.env.STG_SIGN).toString().toUpperCase()
    return encrypt_string === check_sum_value;
}

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            let query = req.query
            let now = new Date()
            let day_in_ms = 1000*60*60*24
            let active_time = new Date(Math.floor(now) + day_in_ms*7)
            let body = JSON.stringify(query)
            let operation = query.operation
            let status = query.status
            let md_order = query.mdOrder
            let create_callback = await pool.query(`INSERT INTO "payments"."callbacks" ("query", "time", "source") VALUES ($1, $2, $3) RETURNING "id"`, [body, now, payment_source])
            let callback_id = create_callback.rows[0].id
            let params = qs.stringify({
                userName: payment_login,
                password: payment_pass,
                orderId: md_order,
            })

            if ( ! check_sum(query) ) {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Ошибка проверки подписи", callback_id])
                throw "err 1"
            }

            if ( operation === "deposited" && [1, "1"].includes(status) ) {
                let payment_reg_answer = await axios.post(payment_reg_url, params).then(r => r.data)
                let check_payment_answer = JSON.stringify(payment_reg_answer)
                let check_orderStatus = payment_reg_answer.orderStatus
                let check_actionCode = payment_reg_answer.actionCode


                if ([2, "2"].includes(check_orderStatus) && [0, "0"].includes(check_actionCode)) {
                    let transaction = await pool.query(`SELECT * FROM "payments"."transactions" WHERE "order_id" = $1 AND "source" = $2`, [md_order, payment_source])

                    if (transaction.rows.length !== 1) {
                        await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Транзакция не была найдена, или mdOrder не уникален", callback_id])
                        throw "err 2"
                    } else if (transaction.rows[0].status_transaction !== "created") {
                        await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Сообщение об оплате уже было записано", callback_id])
                        throw "err 3"
                    } else {
                        let actions = [...new Set(transaction.rows[0].actions)]
                        let amount = transaction.rows[0].amount
                        let user_id = transaction.rows[0].user_id
                        let post_id = transaction.rows[0].post_id
                        // / Здесь включается функция Транзакция + запись о оплате
                        if (actions.includes(0) && actions.length === 1) {

                            await pool.query(`BEGIN`)
                            await pool.query(`UPDATE "payments"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_id" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, md_order, payment_source])
                            await pool.query(`INSERT INTO "payments"."transactions_virtual_rubles" ("amount", "description", "date") VALUES ($1, $2, $3)`, [amount, "Пополнение кошелька", now])
                            await pool.query(`UPDATE "public"."users" SET "virtual_rubles_balance" = "virtual_rubles_balance" + $1 WHERE id =$2`, [amount, user_id])
                            await pool.query(`COMMIT`)

                        } else {

                            actions.forEach(element => {if (typeof element !== 'number' || element <= 0  || ! (Object.keys(relevant_actions).map(key => parseInt(key))).includes(element)) {throw "Er 4"}});

                            await pool.query(`BEGIN`)
                            if ( actions.includes(2) ) { await pool.query(`UPDATE "public"."posts" SET "rotation_date" = $1 WHERE "id" = $2`, [now, post_id]) }
                            if ( actions.includes(3) ) { await pool.query(`UPDATE "public"."posts" SET "color_selection" = $1 WHERE "id" = $2`, [active_time, post_id]) }
                            if ( actions.includes(4) ) { await pool.query(`UPDATE "public"."posts" SET "size_selection" = $1 WHERE "id" = $2`, [active_time, post_id]) }
                            if ( actions.includes(5) ) { await pool.query(`UPDATE "public"."posts" SET "rotation_date" = $1, "color_selection" = $2, "size_selection" = $2 WHERE "id" = $3`, [now, active_time, post_id]) }
                            await pool.query(`UPDATE "payments"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_id" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, md_order, payment_source])
                            await pool.query(`COMMIT`)

                        }
                    }
                } else {
                    await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Не пройдена проверка getOrderStatusExtended", callback_id])
                    throw "err 5"
                }
            }

            return { message: 'OK'}

        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка callback ${e}`)
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