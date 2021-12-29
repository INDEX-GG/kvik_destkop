import {Pool} from "pg"
export default async function handler(req, res) {
    if (req.method === 'POST') {


        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            let likedPosts  = await pool.query(`SELECT "favorites"."liked_post_id" FROM "favorites" WHERE user_id = ${req.body.id}`)
            let likedPostsList = ((likedPosts.rows).map(Object.values)).flat()

            let subscriptions  = await pool.query(`SELECT "subscriptions"."subscription" FROM "subscriptions" WHERE user_id = ${req.body.id}`)
            let subscriptionsList = ((subscriptions.rows).map(Object.values)).flat()

            let userModel = await pool.query(`SELECT "users"."name", "users"."userPhoto", "users"."about", "users"."createdAt", "users"."phone", "users"."email", "users"."raiting", "users"."location", "users"."address" FROM "users" WHERE users.id = ${req.body.id}`)

            userModel.rows[0].favorites = likedPostsList
            userModel.rows[0].subscriptions = subscriptionsList

            return(userModel.rows[0])

        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getUser ${e}`)
            res.json('ошибка api getUser, ', e)
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