import {Pool} from "pg"
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
            if (typeof req.body.post_id !== 'number') {
                throw "Er"
            }
            let comment_exist = await pool.query(`SELECT * FROM "post_comments" WHERE user_id = $1 AND post_id = $2`, [req.body.user_id, req.body.post_id])
            console.log(comment_exist.rows.length);
            if (req.body.comment === "" || req.body.comment === null || req.body.comment === undefined) {
                await pool.query(`DELETE FROM "public"."post_comments" WHERE user_id = $1 AND post_id = $2`, [req.body.user_id, req.body.post_id])
            } else {
                if (comment_exist.rows.length > 0) {
                    await pool.query(`UPDATE "public"."post_comments" SET comment = $3 WHERE user_id = $1 AND post_id = $2`, [req.body.user_id, req.body.post_id, req.body.comment])
                } else {
                    await pool.query(`INSERT INTO "public"."post_comments" ("user_id", "post_id", "comment") VALUES ($1, $2, $3)`, [req.body.user_id, req.body.post_id, req.body.comment])
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