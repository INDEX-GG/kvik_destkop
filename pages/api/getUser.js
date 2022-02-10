import {Pool} from "pg"

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL })

		const main = async () => {
			const user_id = req.body.id

			const jwt = require("jsonwebtoken");
			const token = req.headers["x-access-token"];
			if (!token) {
				throw "A token is required for authentication"
			}
			try {
				jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
			} catch (err) {
				throw "Invalid Token"
			}
			const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
			if (parseInt(req.body.id, 10) !== tokenUser) {
				throw "Invalid Token"
			}

			let user_obj = await pool.query(`SELECT users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address",
				(SELECT COUNT(subscription) FROM "public"."subscriptions" WHERE user_id = $1) AS "subscriptions_count",
				(SELECT COUNT(user_id) FROM "public"."subscriptions" WHERE subscription = $1) AS "subscribers_count",
				(SELECT array_agg(liked_post_id) as liked_post_id FROM "public"."favorites" WHERE user_id = $1) AS "favorites",
				(SELECT array_agg(subscription) as subscription FROM "public"."subscriptions" WHERE user_id = $1) AS "subscriptions"
				FROM "public"."users" WHERE users."id" = $1`, [user_id])
			let user = user_obj.rows[0]
			user.subscriptions_count = parseInt(user.subscriptions_count)
			user.subscribers_count = parseInt(user.subscribers_count)
			return user
		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getUser ${e}`)
			res.json('ошибка api getUser')
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