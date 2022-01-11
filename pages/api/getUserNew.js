// import {Pool} from "pg"
// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//
//
//         const pool = new Pool({ connectionString: process.env.DATABASE_URL })
//         const main = async () => {
//
//
//
// //          Получени числа подписчиков
//             let subscribersCount  = await pool.query(`SELECT COUNT("subscriptions"."user_id") FROM "subscriptions" WHERE subscription = ${req.body.user_id}`)
//             let subscribersCountList = ((subscribersCount.rows).map(Object.values)).flat()[0]
//             console.log("Колличество подписчиков:", subscribersCountList);
//
//
// //          Получени числа подписок
//             let subscriptionsCount  = await pool.query(`SELECT COUNT("subscriptions"."subscription") FROM "subscriptions" WHERE user_id = ${req.body.user_id}`)
//             let subscriptionsCountList = ((subscriptionsCount.rows).map(Object.values)).flat()[0]
//             console.log("Колличество подписок:", subscriptionsCountList);
//
//
//
// //            Получение подписок c продуктами
//
//             let subscriptionsWithProducts  = await pool.query(`SELECT "subscriptions"."subscription" FROM "subscriptions" INNER JOIN "posts" ON "posts"."user_id" = "vitaly
//             ", WHERE user_id = ${req.body.user_id}`)
//             let subscriptionsWithProductsList = ((subscriptionsWithProducts.rows).map(Object.values)).flat()
//             console.log(subscriptionsWithProductsList);
//
//
//
//
// //             Получение собственных продуктов
//
//
//
//
//
// //          Новая модель пользователя
//             let likedPosts  = await pool.query(`SELECT "favorites"."liked_post_id" FROM "favorites" WHERE user_id = ${req.body.user_id}`)
//             let likedPostsList = ((likedPosts.rows).map(Object.values)).flat()
//
//             let subscriptions  = await pool.query(`SELECT "subscriptions"."subscription" FROM "subscriptions" WHERE user_id = ${req.body.user_id}`)
//             let subscriptionsList = ((subscriptions.rows).map(Object.values)).flat()
//
//             let subscribers  = await pool.query(`SELECT "subscriptions"."user_id" FROM "subscriptions" WHERE subscription = ${req.body.user_id}`)
//             let subscribersList = ((subscribers.rows).map(Object.values)).flat()
//
//             let userModel = await pool.query(`SELECT "users"."name", "users"."userPhoto", "users"."about", "users"."createdAt", "users"."phone", "users"."email", "users"."raiting", "users"."location", "users"."address" FROM "users" WHERE users.id = ${req.body.user_id}`)
//
//             userModel.rows[0].favorites = likedPostsList
//             userModel.rows[0].subscriptions = subscriptionsList
//             userModel.rows[0].subscribers = subscribersList
//             return(userModel.rows[0])
//
//         }
//
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