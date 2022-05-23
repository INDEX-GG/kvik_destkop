import {Pool} from "pg"
import tokenCheck from "components/api/tokenCheck";
let format = require('pg-format')
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {
            const userId = await tokenCheck(req.headers["x-access-token"])

            let block_users = req.body.block_users
            let unblock_users = req.body.unblock_users
            let block_posts = req.body.block_posts
            let unblock_posts = req.body.unblock_posts

            block_users.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unblock_users.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            block_posts.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unblock_posts.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});


            let posts_for_unblock = [...new Set(unblock_users)]
            if (posts_for_unblock.length >= 1) {
                await pool.query(`DELETE FROM "public"."block_posts" WHERE user_id = $1 AND block_post_id IN (${posts_for_unblock})`, [userId])
            }

            let posts_for_exist_check = [...new Set(block_posts)]
            if (posts_for_exist_check.length >= 1) {
                let posts_exist = await pool.query(`SELECT block_post_id FROM "public"."block_posts" WHERE user_id = $1 AND block_post_id IN (${posts_for_exist_check})`, [userId])
                let posts_exist_array = ((posts_exist.rows).map(Object.values)).flat()
                let posts_for_block = posts_for_exist_check.filter(item => !posts_exist_array.includes(item))
                if (posts_for_block.length >= 1) {
                    let sql_values = Array.from(posts_for_block, x => [userId, x])
                    await pool.query(format(`INSERT INTO "public"."block_posts" (user_id, block_post_id) VALUES %L`, sql_values))
                }
            }

            let users_for_unblock = [...new Set(unblock_users)]
            if (users_for_unblock.length >= 1) {
                await pool.query(`DELETE FROM "public"."block_users" WHERE user_id = $1 AND blocked_user_id IN (${users_for_unblock})`, [userId])
            }

            let users_for_exist_check = [...new Set(block_users)]
            if (users_for_exist_check.length >= 1) {
                let users_exist = await pool.query(`SELECT blocked_user_id FROM "public"."block_users" WHERE user_id = $1 AND blocked_user_id IN (${users_for_exist_check})`, [userId])
                let users_exist_array = ((users_exist.rows).map(Object.values)).flat()
                let users_for_block = users_for_exist_check.filter(item => !users_exist_array.includes(item))
                if (users_for_block.length >= 1) {
                    let sql_values = Array.from(users_for_block, x => [userId, x])
                    await pool.query(format(`INSERT INTO "public"."block_users" (user_id, blocked_user_id) VALUES %L`, sql_values))
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
            console.error(`ошибка api block ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api block, ' + error.toString())
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}