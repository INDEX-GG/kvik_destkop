import {Pool} from "pg"
let format = require('pg-format')
let tokenCheck = require('components/api/tokenCheck');
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {
            const userId = await tokenCheck(req.headers["x-access-token"])
            let subscribe = req.body.subscribe
            let unsubscribe = req.body.unsubscribe
            subscribe.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unsubscribe.forEach(element => {if (typeof element !== 'number') {throw "Er"}});
            let users_for_unsubscribe = [...new Set(req.body.unsubscribe)]
            if (users_for_unsubscribe.length >= 1) {
                await pool.query(`DELETE FROM "subscriptions" WHERE user_id = $1 AND subscription IN (${users_for_unsubscribe})`, [userId])
            }
            let users_for_exist_check = [...new Set(req.body.subscribe)]
            if (users_for_exist_check.length >= 1) {
                let users_exist = await pool.query(`SELECT subscription FROM "subscriptions" WHERE user_id = $1 AND subscription IN (${users_for_exist_check})`, [userId])
                let users_exist_array = ((users_exist.rows).map(Object.values)).flat()
                let users_for_subscribe = users_for_exist_check.filter(item => !users_exist_array.includes(item))
                if (users_for_subscribe.length >= 1) {
                    let sql_values = Array.from(users_for_subscribe, x => [userId, x])
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
        catch (error) {
            console.error(`ошибка api subscribe ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api subscribe, ' + error.toString())
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
