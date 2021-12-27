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
            let unlike_posts  = await pool.query(`DELETE FROM "favorites" WHERE user_id = ${req.body.user_id} AND liked_post_id IN (${[...new Set(req.body.posts)]}) RETURNING liked_post_id`)
            let list_of_ids_unliked_posts = ((unlike_posts.rows).map(Object.values)).flat()
            let posts_for_like = [...new Set(req.body.posts)].filter(item => !list_of_ids_unliked_posts.includes(item))
            console.log("---   ---   ---")
            console.log("Убрал Лайк: ", list_of_ids_unliked_posts);
            console.log("Поставил Лайк: ", posts_for_like);
            let sql_values = Array.from(posts_for_like, x => [req.body.user_id, x])
            if (sql_values.length > 0) {
                await pool.query(format(`INSERT INTO "favorites" (user_id, liked_post_id) VALUES %L`, sql_values))
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
            console.error(`ошибка api likePosts ${e}`)
            res.json('ошибка api getPostCheck, ', e)
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