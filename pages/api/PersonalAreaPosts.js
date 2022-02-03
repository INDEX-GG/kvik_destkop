import {Pool} from "pg"
import axios from "axios";

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

            const clickhouse_url = process.env.NEXT_PUBLIC_CLHS
            const user_id = req.body.user_id
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            let day_in_ms = 1000*60*60*24
            let date = new Date()
            let active_posts_ids = []
            let archive_posts_ids = []
            let wait_posts_ids = []


            let all_posts = await pool.query(`SELECT
                    array(SELECT row_to_json(t1)FROM(
                    SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."active_time" FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $4) OR (active_time IS NULL)) ORDER BY "posts"."id" desc LIMIT $2 offset $3
                    ) t1) AS active_posts,
                    array(SELECT row_to_json(t2)FROM(
                    SELECT "posts"."id", "posts"."title", "posts"."verify", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."active_time" FROM "posts" WHERE (posts.user_id = $1 AND verify != 0 AND active != 99) OR (posts.user_id = $1 AND active = 0 AND ((active_time < $4) AND (active_time IS NOT NULL))) ORDER BY "posts"."active_time" desc LIMIT $2 offset $3
                    ) t2) AS wait_posts,
                    array(SELECT row_to_json(t3)FROM(
                    SELECT "posts"."id", "posts"."title", "posts"."active", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."active_time", "posts"."archived_time" FROM "posts" WHERE active != 0 AND active != 99 AND verify = 0 AND posts.user_id = $1 ORDER BY "posts"."archived_time" desc LIMIT $2 offset $3
                    ) t3) AS archive_posts
                    `, [user_id, page_limit, page, date])

            all_posts = all_posts.rows[0]
            let active_posts = all_posts.active_posts
            let wait_posts = all_posts.wait_posts
            let archive_posts = all_posts.archive_posts

            active_posts.forEach(
                element => {
                    element.best_before = Math.ceil((Date.parse(element.active_time) - date)/day_in_ms)
                    delete element.active_time
                    active_posts_ids.push(element.id)
                });
            archive_posts.forEach(
                element => {
                    // active time - archive_time (Время на которое можно обратно поднять)
                    // element.best_before = Math.ceil((element.active_time - date)/day_in_ms)
                    element.status = "no_active"
                    element.status_code = element.active
                    delete element.active
                    delete element.active_time
                    archive_posts_ids.push(element.id)
                });
            wait_posts.forEach(
                element => {
                    if (parseInt(element.verify) !== 0) {
                        element.status = "banned"
                    } else if (Math.ceil((Date.parse(element.active_time) - date)/day_in_ms) <= 0) {
                        element.status = "time_limit"
                    }
                    // element.best_before = Math.ceil((element.active_time - date)/day_in_ms)
                    delete element.verify
                    delete element.active_time
                    wait_posts_ids.push(element.id)
                });

            function add_elements(posts_rows, clickhouse, like_data) {
                posts_rows.forEach(
                    element => {
                        let element_last_day_viewing_count = clickhouse.data.find(x => parseInt(x.post_id) === element.id && x.type === 'last_day_viewing_count');
                        let element_all_time_viewing_count = clickhouse.data.find(x => parseInt(x.post_id) === element.id && x.type === 'all_time_viewing_count');
                        let element_last_day_contact_count = clickhouse.data.find(x => parseInt(x.post_id) === element.id && x.type === 'last_day_contact_count');
                        let element_all_time_contact_count = clickhouse.data.find(x => parseInt(x.post_id) === element.id && x.type === 'all_time_contact_count');
                        let element_likes = like_data.rows.find(x => parseInt(x.liked_post_id) === parseInt(element.id));
                        if (element_last_day_viewing_count !== undefined) {element.last_day_viewing_count = parseInt(element_last_day_viewing_count['count(post_id)'])} else {element.last_day_viewing_count = 0}
                        if (element_all_time_viewing_count !== undefined) {element.all_time_viewing_count = parseInt(element_all_time_viewing_count['count(post_id)'])} else {element.all_time_viewing_count = 0}
                        if (element_last_day_contact_count !== undefined) {element.last_day_contact_count = parseInt(element_last_day_contact_count['count(post_id)'])} else {element.last_day_contact_count = 0}
                        if (element_all_time_contact_count !== undefined) {element.all_time_contact_count = parseInt(element_all_time_contact_count['count(post_id)'])} else {element.all_time_contact_count = 0}
                        if (element_likes !== undefined) {element.likes_count = parseInt(element_likes['count'])} else {element.likes_count = 0}
                    });
            }


            let all_posts_ids = active_posts_ids.concat(archive_posts_ids).concat(wait_posts_ids)
            if (all_posts_ids.length === 0 && req.body.page === 1) { return  {"active_posts": [], "wait_posts": [], "archive_posts": [], "active_posts_count": 0, "wait_posts_count": 0, "archive_posts_count": 0}}
            if (all_posts_ids.length === 0 && req.body.page > 1) { return  {"active_posts": [], "wait_posts": [], "archive_posts": []}}


            // Получение значений счетчика
            try {
                const clickhouse_data = `SELECT 'last_day_viewing_count' as type, post_id, count(post_id) FROM clickstream WHERE timestamp = toStartOfDay(now()) AND post_id IN [` + all_posts_ids + `] GROUP BY post_id UNION ALL SELECT 'all_time_viewing_count' as type, post_id, count(post_id) FROM clickstream WHERE post_id IN [` + all_posts_ids + `] GROUP BY post_id UNION ALL SELECT 'last_day_contact_count' as type, post_id, count(post_id) FROM contactstream WHERE timestamp = toStartOfDay(now()) AND post_id IN [` + all_posts_ids + `] GROUP BY post_id UNION ALL SELECT 'all_time_contact_count' as type, post_id, count(post_id) FROM contactstream WHERE post_id IN [` + all_posts_ids + `] GROUP BY post_id FORMAT JSON`
                let clickhouse_answer = await axios.post(clickhouse_url, clickhouse_data).then(r => r.data)
                const likes_count = await pool.query(`SELECT  liked_post_id, COUNT(liked_post_id) FROM "public"."favorites" WHERE liked_post_id IN (${all_posts_ids}) GROUP BY liked_post_id`)
                add_elements(active_posts, clickhouse_answer, likes_count)
                add_elements(wait_posts, clickhouse_answer, likes_count)
                add_elements(archive_posts, clickhouse_answer, likes_count)
            } catch (e) {
                let clickhouse_answer = {"data": []}
                const likes_count = await pool.query(`SELECT  liked_post_id, COUNT(liked_post_id) FROM "public"."favorites" WHERE liked_post_id IN (${all_posts_ids}) GROUP BY liked_post_id`)
                add_elements(active_posts, clickhouse_answer, likes_count)
                add_elements(wait_posts, clickhouse_answer, likes_count)
                add_elements(archive_posts, clickhouse_answer, likes_count)
                console.error(`Внутренняя ошибка api getPost (clhs) ${e}`)
            }

            let answer = {"active_posts": active_posts, "wait_posts": wait_posts, "archive_posts": archive_posts}

            if (req.body.page === 1) {
                let obj = await pool.query(`SELECT
                    (SELECT COUNT(id) FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL))) AS active_posts_count,
                    (SELECT COUNT(id) FROM "posts" WHERE (posts.user_id = $1 AND verify != 0 AND active != 99) OR (posts.user_id = $1 AND active = 0 AND ((active_time < $2) AND (active_time IS NOT NULL)))) AS wait_posts_count,
                    (SELECT COUNT(id) FROM "posts" WHERE active != 0 AND active != 99 AND verify = 0 AND posts.user_id = $1) AS archive_posts_count
                    `, [user_id, new Date()])
                let active_posts_count = parseInt(obj.rows[0].active_posts_count)
                let wait_posts_count = parseInt(obj.rows[0].wait_posts_count)
                let archive_posts_count = parseInt(obj.rows[0].archive_posts_count)
                answer.active_posts_count = active_posts_count
                answer.wait_posts_count = wait_posts_count
                answer.archive_posts_count = archive_posts_count
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
            console.error(`ошибка api personalAreaPosts ${e}`)
            res.json('ошибка api personalAreaPosts, ', e)
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