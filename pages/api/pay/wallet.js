import {Pool} from "pg"
import crypto from "crypto";
import axios from "axios";
import qs from 'qs';
let tokenCheck = require('components/api/tokenCheck');

let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_reg_url = process.env.STG_PAYMENT_REG
let payment_source = process.env.STG_PAYMENT_STATUS

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const userId = tokenCheck(req.headers["x-access-token"])

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            let amount = req.body.amount
            let return_url = "https://onekvik.ru/"
            let fail_url = "https://onekvik.ru/"
            let description = "Пополнение баланса на сайте onekvik.ru"
            let user_id = userId
            let now = new Date()
            const randomString = crypto.randomBytes(2).toString("hex");
            let actions = [1]

            if (user_id === undefined || typeof user_id !== 'number' || user_id < 1) { throw "Er 1" }
            if (amount === undefined || typeof amount !== 'number' || amount < 1) { throw "Er 2" }
            let user_check = await pool.query(`SELECT users.name AS user_name FROM "users" WHERE users.id = $1`, [user_id])
            if (user_check.rows.length === 0) { throw "Er 3" }
            let order_number = user_id.toString() + randomString + now.getTime().toString()
            if (order_number.length > 32) { throw "Er 4" }

            let params = qs.stringify({
                userName: payment_login,
                password: payment_pass,
                orderNumber: order_number,
                amount: amount,
                returnUrl: return_url,
                failUrl: fail_url,
                description: description,
                clientId: user_id
            })

            let payment_reg_answer = await axios.post(payment_reg_url, params).then(r => r.data)
            let order_id = payment_reg_answer.orderId
            let form_url = payment_reg_answer.formUrl
            if (form_url === undefined || order_id === undefined) { throw "Er 5" }
            let transaction_check = await pool.query(`SELECT * FROM "payments"."transactions" WHERE "order_id" = $1 AND "source" = $2`, [order_id, payment_source])
            if (transaction_check.rows.length > 0) { throw "Er 6" }

            await pool.query(`INSERT INTO "payments"."transactions" ("order_id", "order_number", "user_id", "post_id", "amount", "description", "actions", "payment_url", "status_transaction", "source", "create_time") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [order_id, order_number, user_id, null, amount, description, actions, form_url, "created", payment_source, now])

            return {"form_url": form_url}

        }
        try {
            let response = await main()
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api pay/wallet ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            res.status(400).send("ошибка api pay/wallet: " + error.toString())
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
