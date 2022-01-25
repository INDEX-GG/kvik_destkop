// // let favorites = await pool.query(`SELECT array_agg(liked_post_id) as liked_post_id FROM "public"."favorites" WHERE user_id = $1`, [user_id])
// // let subscriptions = await pool.query(`SELECT COUNT(subscription) FROM "public"."subscriptions" WHERE user_id = $1`, [user_id])
//
//
// import {Pool} from "pg"
// import axios from "axios";
//
// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const pool = new Pool({ connectionString: process.env.DATABASE_URL })
//
//         const main = async () => {
//
//             if (typeof req.body.user_id !== 'number' || typeof req.body.page !== 'number' || typeof req.body.page_limit !== 'number') {
//                 throw "Er"
//             }
//
//             const user_id = req.body.user_id
//             const page_limit = req.body.page_limit
//             const page = (req.body.page - 1) * page_limit
//             let day_in_ms = 1000*60*60*24
//             let date = new Date()
//             // let active_posts_ids = []
//             // let archive_posts_ids = []
//             // let wait_posts_ids = []
//
//             let liked_posts = await pool.query(`SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."active_time" FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL)) LIMIT $3 offset $4`, [user_id, new Date(), page_limit, page])
//             active_posts.rows.forEach(
//                 element => {
//                     element.best_before = Math.ceil((element.active_time - date)/day_in_ms)
//                     delete element.active_time
//                     active_posts_ids.push(element.id)
//                 });
//
//             let subscribtions = await pool.query(`SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."created_at", "posts"."photo", "posts"."active_time" FROM "posts" WHERE active != 0 AND verify = 0 AND posts.user_id = $1 LIMIT $2 offset $3`, [user_id, page_limit, page])
//             archive_posts.rows.forEach(
//                 element => {
//                     element.best_before = Math.ceil((element.active_time - date)/day_in_ms)
//                     delete element.active_time
//                     archive_posts_ids.push(element.id)
//                 });
//
//             let search_list = []
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//             // let all_posts_ids = active_posts_ids.concat(archive_posts_ids).concat(wait_posts_ids)
//             // if (all_posts_ids.length === 0) { return  {"active_posts": [], "wait_posts": [], "archive_posts": []}}
//             // const clickhouse_data = `SELECT 'last_day_viewing_count' as type, post_id, count(post_id) FROM clickstream WHERE timestamp = toStartOfDay(now()) AND post_id IN [` + all_posts_ids + `] GROUP BY post_id UNION ALL SELECT 'all_time_viewing_count' as type, post_id, count(post_id) FROM clickstream WHERE post_id IN [` + all_posts_ids + `] GROUP BY post_id UNION ALL SELECT 'last_day_contact_count' as type, post_id, count(post_id) FROM contactstream WHERE timestamp = toStartOfDay(now()) AND post_id IN [` + all_posts_ids + `] GROUP BY post_id UNION ALL SELECT 'all_time_contact_count' as type, post_id, count(post_id) FROM contactstream WHERE post_id IN [` + all_posts_ids + `] GROUP BY post_id FORMAT JSON`
//             // let clickhouse_answer = await axios.post(clickhouse_url, clickhouse_data).then(r => r.data)
//             // const likes_count = await pool.query(`SELECT  liked_post_id, COUNT(liked_post_id) FROM "public"."favorites" WHERE liked_post_id IN (${all_posts_ids}) GROUP BY liked_post_id`)
//             //
//             // function add_elements(posts_rows) {
//             //     posts_rows.forEach(
//             //         element => {
//             //             let element_last_day_viewing_count = clickhouse_answer.data.find(x => parseInt(x.post_id) === element.id && x.type === 'last_day_viewing_count');
//             //             let element_all_time_viewing_count = clickhouse_answer.data.find(x => parseInt(x.post_id) === element.id && x.type === 'all_time_viewing_count');
//             //             let element_last_day_contact_count = clickhouse_answer.data.find(x => parseInt(x.post_id) === element.id && x.type === 'last_day_contact_count');
//             //             let element_all_time_contact_count = clickhouse_answer.data.find(x => parseInt(x.post_id) === element.id && x.type === 'all_time_contact_count');
//             //             let element_likes = likes_count.rows.find(x => parseInt(x.liked_post_id) === parseInt(element.id));
//             //             if (element_last_day_viewing_count !== undefined) {element.last_day_viewing_count = parseInt(element_last_day_viewing_count['count(post_id)'])} else {element.last_day_viewing_count = 0}
//             //             if (element_all_time_viewing_count !== undefined) {element.all_time_viewing_count = parseInt(element_all_time_viewing_count['count(post_id)'])} else {element.all_time_viewing_count = 0}
//             //             if (element_last_day_contact_count !== undefined) {element.last_day_contact_count = parseInt(element_last_day_contact_count['count(post_id)'])} else {element.last_day_contact_count = 0}
//             //             if (element_all_time_contact_count !== undefined) {element.all_time_contact_count = parseInt(element_all_time_contact_count['count(post_id)'])} else {element.all_time_contact_count = 0}
//             //             if (element_likes !== undefined) {element.likes_count = parseInt(element_likes['count'])} else {element.likes_count = 0}
//             //         });
//             // }
//             //
//             // add_elements(active_posts.rows)
//             // add_elements(wait_posts.rows)
//             // add_elements(archive_posts.rows)
//             // let answer = {"active_posts": active_posts.rows, "wait_posts": wait_posts.rows, "archive_posts": archive_posts.rows}
//             // if (req.body.page === 1) {
//             //     let active_posts_count = await pool.query(`SELECT COUNT(id) FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL))`, [user_id, new Date()])
//             //     let wait_posts_count = await pool.query(`SELECT COUNT(id) FROM "posts" WHERE (posts.user_id = $1 AND verify != 0) OR (posts.user_id = $1 AND active = 0 AND ((active_time < $2) AND (active_time IS NOT NULL)))`, [user_id, new Date()])
//             //     let archive_posts_count = await pool.query(`SELECT COUNT(id) FROM "posts" WHERE active != 0 AND verify = 0 AND posts.user_id = $1`, [user_id])
//             //     answer.active_posts_count = parseInt(active_posts_count.rows[0].count)
//             //     answer.wait_posts_count = parseInt(wait_posts_count.rows[0].count)
//             //     answer.archive_posts_count = parseInt(archive_posts_count.rows[0].count)
//             // }
//             //
//             // return answer
//             return 123456789123456789
//
//         }
//         try {
//             let response = await main();
//             res.status(200);
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(response))
//         }
//         catch (e) {
//             console.error(`ошибка api getUser ${e}`)
//             res.json('ошибка api getUser, ', e)
//             res.status(405).end();
//         }
//         finally {
//             await pool.end()
//         }
//
//     } else {
//         res.json({ message: 'method not allowed' })
//         res.status(405).end()
//     }
// }