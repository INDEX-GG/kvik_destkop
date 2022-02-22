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

            let block_users = req.body.block_users
            let unblock_users = req.body.unblock_users
            let block_posts = req.body.block_posts
            let unblock_posts = req.body.unblock_posts

            block_users.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unblock_users.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            block_posts.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            unblock_posts.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});


            let posts_for_unblock = [...new Set(req.body.unblock_posts)]
            if (posts_for_unblock.length >= 1) {
                await pool.query(`DELETE FROM "public"."block_posts" WHERE user_id = $1 AND block_post_id IN (${posts_for_unblock})`, [req.body.user_id])
            }

            let posts_for_exist_check = [...new Set(req.body.block_posts)]
            if (posts_for_exist_check.length >= 1) {
                let posts_exist = await pool.query(`SELECT block_post_id FROM "public"."block_posts" WHERE user_id = $1 AND block_post_id IN (${posts_for_exist_check})`, [req.body.user_id])
                let posts_exist_array = ((posts_exist.rows).map(Object.values)).flat()
                let posts_for_block = posts_for_exist_check.filter(item => !posts_exist_array.includes(item))
                if (posts_for_block.length >= 1) {
                    let sql_values = Array.from(posts_for_block, x => [req.body.user_id, x])
                    await pool.query(format(`INSERT INTO "public"."block_posts" (user_id, block_post_id) VALUES %L`, sql_values))
                }
            }

            let users_for_unblock = [...new Set(req.body.unblock_users)]
            if (users_for_unblock.length >= 1) {
                await pool.query(`DELETE FROM "public"."block_users" WHERE user_id = $1 AND blocked_user_id IN (${users_for_unblock})`, [req.body.user_id])
            }

            let users_for_exist_check = [...new Set(req.body.block_users)]
            if (users_for_exist_check.length >= 1) {
                let users_exist = await pool.query(`SELECT blocked_user_id FROM "public"."block_users" WHERE user_id = $1 AND blocked_user_id IN (${users_for_exist_check})`, [req.body.user_id])
                let users_exist_array = ((users_exist.rows).map(Object.values)).flat()
                let users_for_block = users_for_exist_check.filter(item => !users_exist_array.includes(item))
                if (users_for_block.length >= 1) {
                    let sql_values = Array.from(users_for_block, x => [req.body.user_id, x])
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