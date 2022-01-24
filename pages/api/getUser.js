import {Pool} from "pg"

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL })

		const main = async () => {
			const user_id = req.body.id
			let user = await pool.query(`SELECT users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address" FROM "public"."users" WHERE users."id" = $1`, [user_id])
			let user_obj = user.rows[0]



			// let favorites = await pool.query(`SELECT array_agg(liked_post_id) as liked_post_id FROM "public"."favorites" WHERE user_id = $1`, [user_id])
			// let subscribtions = await pool.query(`SELECT array_agg(subscription) as subscription FROM "public"."subscriptions" WHERE user_id = $1`, [user_id])
			// let subscribers = await pool.query(`SELECT array_agg(user_id) as user_id FROM "public"."subscriptions" WHERE subscription = $1`, [user_id])
			// user_obj.favorites = favorites.rows[0].liked_post_id
			// user_obj.subscribtions = subscribtions.rows[0].subscription
			// user_obj.subscribers = subscribers.rows[0].user_id


			user_obj.favorites = "[]"
			user_obj.subscribtions = "[]"
			user_obj.subscribers = "[]"
			return user_obj
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