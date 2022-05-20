import {Pool} from "pg"
import tokenCheck from "components/api/tokenCheck";

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL })

		const main = async () => {
			const user_id = tokenCheck(req.headers["x-access-token"])
			let user_obj = await pool.query(`SELECT users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address",
				(SELECT COUNT(subscription) FROM "public"."subscriptions" WHERE user_id = $1) AS "subscriptions_count",
				(SELECT COUNT(user_id) FROM "public"."subscriptions" WHERE subscription = $1) AS "subscribers_count",
				(SELECT array_agg(liked_post_id) as liked_post_id FROM "public"."favorites" WHERE user_id = $1) AS "favorites",
				(SELECT array_agg(subscription) as subscription FROM "public"."subscriptions" WHERE user_id = $1) AS "subscriptions"
				FROM "public"."users" WHERE users."id" = $1`, [user_id])
			let user = user_obj.rows[0]
			user.subscriptions_count = parseInt(user.subscriptions_count)
			user.subscribers_count = parseInt(user.subscribers_count)
			if (user.subscriptions == null) {user.subscriptions = []}
			if (user.favorites == null) {user.favorites = []}
			return user
		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (error) {
			console.error(`ошибка api getUser ${error}`)
			if (error === "A token is required for authentication") {
				return res.status(403).send("A token is required for authentication");
			}
			if (error === "Invalid Token") {
				return res.status(401).send("Invalid Token");
			}
			// res.status(400).send("ошибка api subscribe: " + error.toString())
			res.json('ошибка api getUser, ', error)
		}
		finally {
			await pool.end()
		}
	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}
