import {Pool} from "pg"
let format = require('pg-format')
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

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {
            let unsubscribe_people  = await pool.query(`DELETE FROM "subscriptions" WHERE user_id = ${req.body.user_id} AND subscription IN (${[...new Set(req.body.users)]}) RETURNING subscription`)
            let list_of_ids_unsubscribe_people = ((unsubscribe_people.rows).map(Object.values)).flat()
            let people_for_subscribe = [...new Set(req.body.users)].filter(item => !list_of_ids_unsubscribe_people.includes(item))
            console.log("---   ---   ---")
            console.log(" Отписался: ", list_of_ids_unsubscribe_people);
            console.log("Подписался: ", people_for_subscribe);
            let sql_values = Array.from(people_for_subscribe, x => [req.body.user_id, x])
            if (sql_values.length > 0) {
                await pool.query(format(`INSERT INTO "subscriptions" (user_id, subscription) VALUES %L`, sql_values))
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