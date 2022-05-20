import {Pool} from "pg"
import tokenCheck from "components/api/tokenCheck";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            const userId = tokenCheck(req.headers["x-access-token"])
            if (typeof req.body.page !== 'number' || typeof req.body.page_limit !== 'number') {
                throw "Er"
            }

            const user_id = userId
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            let day_in_ms = 1000*60*60*24
            let date = new Date()


            let all_posts = await pool.query(`SELECT
                    array(SELECT row_to_json(t1)FROM(
                        SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."color_selection", "posts"."size_selection", "posts"."created_at", "posts"."photo", "posts"."active_time", "posts"."address", "posts"."active", "posts"."verify" ,"posts"."user_id", "users"."name", "users"."userPhoto", "users"."raiting" FROM "public"."favorites" INNER JOIN "posts" ON favorites.liked_post_id = posts.id INNER JOIN "users" ON posts.user_id = users.id WHERE posts.active != 99 AND favorites.user_id = $2 AND posts.user_id != $2 ORDER BY "favorites"."id" desc LIMIT $3 offset $4
                    ) t1) AS liked_posts,
                    array(SELECT row_to_json(t2)FROM(
                        SELECT "users"."id", "users"."name", "users"."userPhoto", "users"."raiting",
                        (SELECT COUNT("posts"."id") FROM "public"."posts" WHERE "posts"."user_id" = "users"."id" AND "posts"."active" = 0 AND "posts"."verify" = 0 AND (("posts"."active_time" >= $1) OR ("posts"."active_time" IS NULL)) ) AS "user_products_count",
                        array(SELECT row_to_json(t)FROM(SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."photo"  FROM "public"."posts" WHERE "posts"."user_id" = "users"."id" AND "posts"."active" = 0 AND "posts"."verify" = 0 AND "posts"."photo" IS NOT NULL AND (("posts"."active_time" >= $1) OR ("posts"."active_time" IS NULL)) ORDER BY "posts"."id" desc LIMIT 10) t) AS user_products
                        FROM "public"."subscriptions" 
                        INNER JOIN "public"."users" ON "subscriptions"."subscription" = "users"."id" 
                        WHERE "subscriptions"."user_id" = $2 AND "subscriptions"."subscription" != $2 ORDER BY "subscriptions"."id" desc LIMIT $3 offset $4
                    ) t2) AS subscriptions
                    `, [date, user_id, page_limit, page])

            all_posts = all_posts.rows[0]

            let liked_posts = all_posts.liked_posts
            let subscriptions = all_posts.subscriptions

            liked_posts.forEach(
                element => {
                    element.highlighting = element.color_selection >= date;
                    element.selection_size = element.size_selection >= date;
                    delete element.color_selection
                    delete element.size_selection
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

            let answer = {"liked_posts": liked_posts, "subscriptions": subscriptions, "searchs": []}
            if (req.body.page === 1) {
                let obj = await pool.query(`SELECT
                    (SELECT COUNT("posts"."id") FROM "public"."favorites" INNER JOIN "posts" ON "favorites"."liked_post_id" = "posts"."id"  WHERE posts.active != 99 AND "favorites"."user_id" = $1 AND "posts"."user_id" != $1) AS liked_posts_count,
                    (SELECT COUNT("users"."id") FROM "public"."subscriptions" INNER JOIN "users" ON "subscriptions"."subscription" = "users"."id" WHERE "subscriptions"."user_id" = $1 AND "subscriptions"."subscription" != $1) AS subscriptions_count
                    `, [user_id])
                let liked_posts_count = parseInt(obj.rows[0].liked_posts_count)
                let subscriptions_count = parseInt(obj.rows[0].subscriptions_count)
                answer.liked_posts_count = liked_posts_count
                answer.subscriptions_count = subscriptions_count
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
        catch (error) {
            console.error(`ошибка api PersonalAreaFavorites ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api PersonalAreaFavorites, ', error)
        }
        finally {
            await pool.end()
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
