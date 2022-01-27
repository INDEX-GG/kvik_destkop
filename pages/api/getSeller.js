import {Pool} from "pg";

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const main = async () => {
            if (typeof req.body.id !== 'number') {throw "Er"}
            const user_id = req.body.id
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit

            let posts = await pool.query(`SELECT
                    array(SELECT row_to_json(t)FROM(
                    SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."address" FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $3 AND ((active_time >= $4) OR (active_time IS NULL)) ORDER BY "posts"."id" desc LIMIT $1 offset $2
                    ) t) AS active_posts,
                    array(SELECT row_to_json(t)FROM(
                    SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."address" FROM "posts" WHERE active != 0 AND active != 99 AND verify = 0 AND posts.user_id = $3 ORDER BY "posts"."archived_time" desc LIMIT $1 offset $2
                    ) t) AS archive_posts`, [page_limit, page, user_id, new Date()])
            let answer = posts.rows[0]
            if (req.body.page === 1) {
                let obj = await pool.query(`SELECT
                    (SELECT row_to_json(t)FROM(
                    SELECT users."name", users."userPhoto", users."createdAt", users."raiting", 
                    (SELECT COUNT(subscription) FROM "public"."subscriptions" WHERE user_id = $1) AS "subscriptions_count",
                    (SELECT COUNT(user_id) FROM "public"."subscriptions" WHERE subscription = $1) AS "subscribers_count"
                    FROM "public"."users" WHERE users."id" = $1) t) AS seller,
                    (SELECT COUNT(id) FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL))) AS active_posts_count,
                    (SELECT COUNT(id) FROM "posts" WHERE active != 0 AND active != 99 AND verify = 0 AND posts.user_id = $1) AS archive_posts_count`, [user_id, new Date()])
                answer.seller = obj.rows[0].seller
                answer.active_posts_count = obj.rows[0].active_posts_count
                answer.archive_posts_count = obj.rows[0].archive_posts_count
            }
            return answer
        }
        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getSeller ${e}`)
            res.json('ошибка api getSeller, ', e)
            res.status(405).end();
        }
        finally {
            await pool.end();
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
