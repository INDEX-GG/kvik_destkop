import {Pool} from "pg"
import tokenCheck from "components/api/tokenCheck";
let format = require('pg-format')
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {
            const userId = await tokenCheck(req.headers["x-access-token"])

            let like_posts = req.body.like_posts
            let unlike_posts = req.body.unlike_posts
            like_posts.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unlike_posts.forEach(element => {if (typeof element !== 'number') {throw "Er"}});


            let posts_for_unlike = [...new Set(unlike_posts)]
            if (posts_for_unlike.length >= 1) {
                await pool.query(`DELETE FROM "favorites" WHERE user_id = $1 AND liked_post_id IN (${posts_for_unlike})`, [userId])
            }


            let posts_for_exist_check = [...new Set(like_posts)]
            if (posts_for_exist_check.length >= 1) {
                let like_exist = await pool.query(`SELECT liked_post_id FROM "favorites" WHERE user_id = $1 AND liked_post_id IN (${posts_for_exist_check})`, [userId])
                let like_exist_array = ((like_exist.rows).map(Object.values)).flat()
                let posts_for_like = posts_for_exist_check.filter(item => !like_exist_array.includes(item))
                if (posts_for_like.length >= 1) {
                    let sql_values = Array.from(posts_for_like, x => [userId, x])
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
        catch (error) {
            console.error(`ошибка api likePosts ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api likePosts, ' + error.toString())
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}