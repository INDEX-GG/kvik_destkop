// import {Pool} from "pg";
//
// export default async function handler(req, res) {
//
//     if (req.method === 'POST') {
//         const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//         const main = async () => {
//
//
//
//             const answer  = await pool.query(`SELECT "users"."name" FROM "users" WHERE "users"."id" = ${req.body.user_id}`)
//             return(answer.rows)
//
//
//         }
//         try {
//             let response = await main();
//             res.status(200);
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(response))
//         }
//         catch (e) {
//             console.error(`ошибка api getPostCheck ${e}`)
//             res.json('ошибка api getPostCheck, ', e)
//             res.status(405).end();
//         }
//         finally {
//             await pool.end();
//         }
//
//     } else {
//         res.json({ message: 'method not allowed' })
//         res.status(405).end()
//     }
// }