import {Pool} from "pg"
import crypto from "crypto";
import axios from "axios";
import qs from 'qs';
let tokenCheck = require('components/api/tokenCheck');

const relevant_actions = {
    2: {
        "description": "Поднятие вверх объявления KVIK",
        "price": 1.00},
    3: {
        "description": "Выделение цветом объявления KVIK",
        "price": 1.00},
    4: {
        "description": "XL объявление KVIK",
        "price": 1.00},
    5: {
        "description": "Комбо продвижение KVIK",
        "price": 1.00}
}

let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_token_url = process.env.STG_PAYMENT_TOKEN
let payment_reg_url = process.env.STG_PAYMENT_REG
let payment_source = process.env.STG_PAYMENT_STATUS

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userId = tokenCheck(req.headers["x-access-token"])
        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            let amount = 0
            let description = "Оплата услуг по продвижению на сайте onekvik.ru"
            let user_id = userId
            let post_id = req.body.post_id
            let now = new Date()
            const randomString = crypto.randomBytes(2).toString("hex");
            let actions = [...new Set(req.body.actions)]
            if (user_id === undefined || typeof user_id !== 'number' || user_id < 1) { throw "Er 1" }
            if (post_id === undefined || typeof post_id !== 'number' || post_id < 1) { throw "Er 2" }
            actions.forEach(element => {if (typeof element !== 'number' || element <= 0  || ! (Object.keys(relevant_actions).map(key => parseInt(key))).includes(element)) {throw "Er 3"}});
            let check_post = await pool.query(`SELECT users.name AS user_name, posts.id, posts,title FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = $1 AND users.id = $2`, [post_id, user_id])
            if (check_post.rows.length === 0) { throw "Er 4" }
            let order_number = user_id.toString() + randomString + now.getTime().toString()
            if (order_number.length > 32) { throw "Er 5" }

            actions.forEach(element => { amount += relevant_actions[element].price})

            let token_request = await axios.get(payment_token_url,
                {
                    auth: {username: payment_login, password: payment_pass},
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(r => r.data)
            let payment_token = token_request.token

            let params = qs.stringify({
                pay_amount: amount,
                clientid: user_id,
                orderid: order_number,
                service_name: description,
                token: payment_token
            })

            let payment_reg_answer = await axios.post(
                payment_reg_url,
                params,
                {headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    auth: {username: payment_login, password: payment_pass}
                }).then(r => r.data)

            let order_id = payment_reg_answer.invoice_id
            let form_url = payment_reg_answer.invoice_url

            if (form_url === undefined || order_id === undefined) { throw "Er 6" }
            let transaction_check = await pool.query(`SELECT * FROM "payments"."transactions" WHERE "order_id" = $1 AND "source" = $2`, [order_id, payment_source])
            if (transaction_check.rows.length > 0) { throw "Er 7" }
            await pool.query(`INSERT INTO "payments"."transactions" ("order_id", "order_number", "user_id", "post_id", "amount", "description", "actions", "payment_url", "status_transaction", "source", "create_time") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [order_id, order_number, user_id, post_id, amount, description, actions, form_url, "created", payment_source, now])

            return {"form_url": form_url}

        }
        try {
            let response = await main()
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api pay/promotion ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            res.status(400).send("ошибка api pay/promotion: " + error.toString())
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
