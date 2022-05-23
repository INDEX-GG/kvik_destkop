import {Pool} from "pg"
import tokenCheck from "components/api/tokenCheck";
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            const userId = await tokenCheck(req.headers["x-access-token"])
            if (typeof req.body.post_id !== 'number') {
                throw "Er"
            }
            let comment_exist = await pool.query(`SELECT * FROM "post_comments" WHERE user_id = $1 AND post_id = $2`, [req.body.user_id, req.body.post_id])
            console.log(comment_exist.rows.length);
            if (req.body.comment === "" || req.body.comment === null || req.body.comment === undefined) {
                await pool.query(`DELETE FROM "public"."post_comments" WHERE user_id = $1 AND post_id = $2`, [userId, req.body.post_id])
            } else {
                if (comment_exist.rows.length > 0) {
                    await pool.query(`UPDATE "public"."post_comments" SET comment = $3 WHERE user_id = $1 AND post_id = $2`, [userId, req.body.post_id, req.body.comment])
                } else {
                    await pool.query(`INSERT INTO "public"."post_comments" ("user_id", "post_id", "comment") VALUES ($1, $2, $3)`, [userId, req.body.post_id, req.body.comment])
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
            console.error(`ошибка api writeComment ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api writeComment, ' + error.toString())
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}