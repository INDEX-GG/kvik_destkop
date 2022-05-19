// import {Pool} from "pg"
//
// const relevant_actions = {
//     2: {
//         "description": "Поднятие вверх объявления KVIK",
//         "price": 1900},
//     3: {
//         "description": "Выделение цветом объявления KVIK",
//         "price": 3900},
//     4: {
//         "description": "XL объявление KVIK",
//         "price": 3900},
//     5: {
//         "description": "Комбо продвижение KVIK",
//         "price": 8500}
// }
//
// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//
//         // const jwt = require("jsonwebtoken");
//         // const token = req.headers["x-access-token"];
//         // if (!token) {
//         //     return res.status(403).send("A token is required for authentication");
//         // }
//         // try {
//         //     jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
//         // } catch (err) {
//         //     return res.status(401).send("Invalid Token");
//         // }
//         // const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
//         // if (parseInt(req.body.user_id, 10) !== tokenUser) {
//         //     return res.status(403).send("Invalid Token");
//         // }
//
//         const pool = new Pool({ connectionString: process.env.DATABASE_URL })
//         const main = async () => {
//
//             // let amount = 0
//             let user_id = req.body.user_id
//             let post_id = req.body.post_id
//             // let now = new Date()
//             let actions = [...new Set(req.body.actions)]
//
//             if (user_id === undefined || typeof user_id !== 'number' || user_id < 1) { throw "Er 1" }
//             if (post_id === undefined || typeof post_id !== 'number' || post_id < 1) { throw "Er 2" }
//             actions.forEach(element => {if (typeof element !== 'number' || element <= 0  || ! (Object.keys(relevant_actions).map(key => parseInt(key))).includes(element)) {throw "Er 3"}});
//             let check_post = await pool.query(`SELECT users.name AS user_name, posts.id, posts,title FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = $1 AND users.id = $2`, [post_id, user_id])
//             if (check_post.rows.length === 0) { throw "Er 4" }
//
//             actions.forEach(element => { amount += relevant_actions[element].price})
//
//             // Проверить достаточно ли средств для оплаты услуг, если меньше, вызвать ошибку
//             // Транзакцией ( 1.Списать деньги в user, 2.Записать транзакцию, 3.Включить опции )
//
//             // await pool.query(`INSERT INTO "payments"."transactions" ("order_id", "order_number", "user_id", "post_id", "amount", "description", "actions", "payment_url", "status_transaction", "source", "create_time") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [order_id, order_number, user_id, post_id, amount, description, actions, form_url, "created", payment_source, now])
//             return {"message": "success"}
//
//         }
//         try {
//             let response = await main()
//             res.status(200)
//             res.setHeader('Content-Type', 'application/json')
//             res.end(JSON.stringify(response))
//         }
//         catch (e) {
//             console.error(`ошибка api payment ${e}`)
//             res.status(400).json({ message: 'ошибка api payment'})
//         }
//         finally {
//             await pool.end()
//         }
//     } else {
//         res.json({ message: 'method not allowed' })
//         res.status(405).end()
//     }
// }
