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
            if (typeof req.body.user_id !== 'number') {
                throw "Er"
            }

            let like_posts = req.body.like_posts
            let unlike_posts = req.body.unlike_posts
            like_posts.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unlike_posts.forEach(element => {if (typeof element !== 'number') {throw "Er"}});


            let posts_for_unlike = [...new Set(req.body.unlike_posts)]
            if (posts_for_unlike.length >= 1) {
                await pool.query(`DELETE FROM "favorites" WHERE user_id = $1 AND liked_post_id IN (${posts_for_unlike})`, [req.body.user_id])
            }


            let posts_for_exist_check = [...new Set(req.body.like_posts)]
            if (posts_for_exist_check.length >= 1) {
                let like_exist = await pool.query(`SELECT liked_post_id FROM "favorites" WHERE user_id = $1 AND liked_post_id IN (${posts_for_exist_check})`, [req.body.user_id])
                let like_exist_array = ((like_exist.rows).map(Object.values)).flat()
                let posts_for_like = posts_for_exist_check.filter(item => !like_exist_array.includes(item))
                if (posts_for_like.length >= 1) {
                    let sql_values = Array.from(posts_for_like, x => [req.body.user_id, x])
                    await pool.query(format(`INSERT INTO "favorites" (user_id, liked_post_id) VALUES %L`, sql_values))
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