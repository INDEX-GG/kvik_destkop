import {Pool} from "pg"
import crypto from "crypto";
import axios from "axios";
import qs from 'qs';

let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_reg_url = process.env.STG_PAYMENT_REG
let payment_source = process.env.STG_PAYMENT_STATUS

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const jwt = require("jsonwebtoken");
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
        if (parseInt(req.body.user_id, 10) !== tokenUser) {
            return res.status(403).send("Invalid Token");
        }

        const pool_payments = new Pool({ connectionString: process.env.DATABASE_URL_PAYMENTS })
        const pool_posts = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

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

            let amount = 0
            let return_url = "https://onekvik.ru/"
            let fail_url = "https://onekvik.ru/"
            let description = "Оплата услуг по продвижению на сайте onekvik.ru"
            let user_id = req.body.user_id
            let post_id = req.body.post_id
            let now = new Date()
            const randomString = crypto.randomBytes(2).toString("hex");
            let actions = [...new Set(req.body.actions)]

            if (user_id === undefined || typeof user_id !== 'number' || user_id < 1) { throw "Er 1" }
            if (post_id === undefined || typeof post_id !== 'number' || post_id < 1) { throw "Er 2" }
            actions.forEach(element => {if (typeof element !== 'number' || element <= 0  || ! (Object.keys(relevant_actions).map(key => parseInt(key))).includes(element)) {throw "Er 3"}});
            let check_post = await pool_posts.query(`SELECT users.name AS user_name, posts.id, posts,title FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = $1 AND users.id = $2`, [post_id, user_id])
            if (check_post.rows.length === 0) { throw "Er 4" }
            let order_number = user_id.toString() + randomString + now.getTime().toString()
            if (order_number.length > 32) { throw "Er 5" }

            actions.forEach(element => { amount += relevant_actions[element].price})
            console.log(amount);

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
            if (form_url === undefined || order_id === undefined) { throw "Er 6" }

            await pool_payments.query(`INSERT INTO "public"."transactions" ("order_id", "order_number", "user_id", "post_id", "amount", "description", "actions", "payment_url", "status_transaction", "source", "create_time") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [order_id, order_number, user_id, post_id, amount, description, actions, form_url, "created", payment_source, now])

            return {"form_url": form_url}

        }
        try {
            let response = await main()
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api payment ${e}`)
            res.status(400).json({ message: 'ошибка api payment'})
        }
        finally {
            await pool_payments.end()
            await pool_posts.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
