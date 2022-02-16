import {Pool} from "pg"
import qs from "qs";
import axios from "axios";

let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_reg_url = process.env.STG_PAYMENT_CHECK
let payment_source = process.env.STG_PAYMENT_STATUS

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL_PAYMENTS })
        const main = async () => {

            let query = req.query
            let now = new Date()
            let body = JSON.stringify(query)
            let operation = query.operation
            let status = query.status
            let md_order = query.mdOrder
            let create_callback = await pool.query(`INSERT INTO "public"."callbacks" ("query", "time", "source") VALUES ($1, $2, $3) RETURNING "id"`, [body, now, payment_source])
            let callback_id = create_callback.rows[0].id
            let params = qs.stringify({
                userName: payment_login,
                password: payment_pass,
                orderId: md_order,
            })

            if ( operation === "deposited" && [1, "1"].includes(status) ) {
                let payment_reg_answer = await axios.post(payment_reg_url, params).then(r => r.data)
                let check_payment_answer = JSON.stringify(payment_reg_answer)
                let check_orderStatus = payment_reg_answer.orderStatus
                let check_actionCode = payment_reg_answer.actionCode

                // if ([6, "6"].includes(check_orderStatus) && [-2007, "-2007"].includes(check_actionCode)) {
                if ([2, "2"].includes(check_orderStatus) && [0, "0"].includes(check_actionCode)) {
                    let transaction = await pool.query(`SELECT * FROM "public"."transactions" WHERE "order_id" = $1 AND "source" = $2`, [md_order, payment_source])
                    if (transaction.rows.length !== 1) {
                        await pool.query(`UPDATE "public"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["транзакция не была найдена, или mdOrder не уникален", callback_id])
                        throw "err"
                    } else if (transaction.rows[0].status_transaction !== "created") {
                        await pool.query(`UPDATE "public"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["сообщение об оплате уже было записано", callback_id])
                        throw "err"
                    } else {
                        await pool.query(`UPDATE "public"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_id" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, md_order, payment_source])
                        // Здесь включается функция
                    }
                } else {
                    await pool.query(`UPDATE "public"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Не пройдена проверка getOrderStatusExtended", callback_id])
                    throw "err"
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