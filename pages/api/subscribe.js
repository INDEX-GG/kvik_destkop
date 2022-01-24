import {Pool} from "pg"
let format = require('pg-format')
export default async function handler(req, res) {
    if (req.method === 'POST') {

        // const jwt = require("jsonwebtoken");
        // const token = req.headers["x-access-token"];
        // if (!token) {
        //     return res.status(403).send("A token is required for authentication");
        // }
        // try {
        //     jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        // } catch (err) {
        //     return res.status(401).send("Invalid Token");
        // }
        // const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
        // if (parseInt(req.body.user_id, 10) !== tokenUser) {
        //     return res.status(403).send("Invalid Token");
        // }

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {
            if (typeof req.body.user_id !== 'number') {
                throw "Er"
            }


            let subscribe = req.body.subscribe
            let unsubscribe = req.body.unsubscribe
            subscribe.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unsubscribe.forEach(element => {if (typeof element !== 'number') {throw "Er"}});


            let users_for_unsubscribe = [...new Set(req.body.unsubscribe)]
            if (users_for_unsubscribe.length >= 1) {
                await pool.query(`DELETE FROM "subscriptions" WHERE user_id = $1 AND subscription IN (${users_for_unsubscribe})`, [req.body.user_id])
            }


            let users_for_exist_check = [...new Set(req.body.subscribe)]
            if (users_for_exist_check.length >= 1) {
                let users_exist = await pool.query(`SELECT subscription FROM "subscriptions" WHERE user_id = $1 AND subscription IN (${users_for_exist_check})`, [req.body.user_id])
                let users_exist_array = ((users_exist.rows).map(Object.values)).flat()
                let users_for_subscribe = users_for_exist_check.filter(item => !users_exist_array.includes(item))
                if (users_for_subscribe.length >= 1) {
                    let sql_values = Array.from(users_for_subscribe, x => [req.body.user_id, x])
                    await pool.query(format(`INSERT INTO "subscriptions" (user_id, subscription) VALUES %L`, sql_values))
                }
            }

            return {"message": "success"}

        }
        try {
            let response = await main()
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api subscribe ${e}`)
            res.json('ошибка api subscribe, ', e)
            res.status(405).end()
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}