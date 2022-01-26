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

            if (typeof req.body.user_id !== 'number' || typeof req.body.page !== 'number' || typeof req.body.page_limit !== 'number') {
                throw "Er"
            }

            const user_id = req.body.user_id
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            let day_in_ms = 1000*60*60*24
            let date = new Date()

            let liked_posts = await pool.query(`SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."active_time", "posts"."address", "posts"."active", "posts"."verify" ,"posts"."user_id", "users"."name", "users"."userPhoto", "users"."raiting" FROM "public"."favorites" INNER JOIN "posts" ON favorites.liked_post_id = posts.id INNER JOIN "users" ON posts.user_id = users.id WHERE favorites.user_id = $1 AND posts.user_id != $1 ORDER BY "favorites"."id" desc LIMIT $2 offset $3`, [user_id, page_limit, page])
            liked_posts.rows.forEach(
                element => {
                    if (parseInt(element.verify) !== 0) {
                        element.status = "banned"
                    } else if (parseInt(element.active) !== 0) {
                        element.status = "no_active"
                    } else if (Math.ceil((element.active_time - date)/day_in_ms) <= 0) {
                        element.status = "time_limit"
                    } else {element.status = "ok"}
                    delete element.active_time
                    delete element.active
                    delete element.verify
                });

            let subscribtions = await pool.query(`SELECT "users"."id", "users"."name", "users"."userPhoto", "users"."raiting",
                (SELECT COUNT("posts"."id") FROM "public"."posts" WHERE "posts"."user_id" = "users"."id" AND "posts"."active" = 0 AND "posts"."verify" = 0 AND (("posts"."active_time" >= $1) OR ("posts"."active_time" IS NULL)) ) AS "user_products_count",
                array(SELECT row_to_json(t)FROM(SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."photo"  FROM "public"."posts" WHERE "posts"."user_id" = "users"."id" AND "posts"."active" = 0 AND "posts"."verify" = 0 AND (("posts"."active_time" >= $1) OR ("posts"."active_time" IS NULL)) ORDER BY "posts"."id" desc LIMIT 10) t) AS user_products
                FROM "public"."subscriptions" 
                INNER JOIN "public"."users" ON "subscriptions"."subscription" = "users"."id" 
                WHERE "subscriptions"."user_id" = $2 AND "subscriptions"."subscription" != $2 ORDER BY "subscriptions"."id" desc LIMIT $3 offset $4`, [date, user_id, page_limit, page])

            let answer = {"liked_posts": liked_posts.rows, "subscriptions": subscribtions.rows, "searchs": []}
            if (req.body.page === 1) {
                let liked_posts_count = await pool.query(`SELECT COUNT("posts"."id") FROM "public"."favorites" INNER JOIN "posts" ON "favorites"."liked_post_id" = "posts"."id"  WHERE "favorites"."user_id" = $1 AND "posts"."user_id" != $1`, [user_id])
                let subscriptions_count = await pool.query(`SELECT COUNT("users"."id") FROM "public"."subscriptions" INNER JOIN "users" ON "subscriptions"."subscription" = "users"."id" WHERE "subscriptions"."user_id" = $1 AND "subscriptions"."subscription" != $1`, [user_id])
                answer.liked_posts_count = parseInt(liked_posts_count.rows[0].count)
                answer.subscriptions_count = parseInt(subscriptions_count.rows[0].count)
                answer.searchs_count = 0
            }
            return answer
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api personalAreaFavorites ${e}`)
            res.json('ошибка api personalAreaFavorites, ', e)
            res.status(405).end();
        }
        finally {
            await pool.end()
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
