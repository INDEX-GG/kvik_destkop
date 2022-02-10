import {Pool} from "pg"

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL })

		const main = async () => {
			const user_id = req.body.id

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
			if (parseInt(req.body.id, 10) !== tokenUser) {
				return res.status(403).send("Invalid Token");
			}

			//SWIPESWIPESWIPE//SWIPESWIPESWIPE//SWIPESWIPESWIPE

			let user = await pool.query(`SELECT users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address",
				(SELECT COUNT(subscription) FROM "public"."subscriptions" WHERE user_id = $1) AS "subscriptions_count",
				(SELECT COUNT(user_id) FROM "public"."subscriptions" WHERE subscription = $1) AS "subscribers_count",
				(SELECT array_agg(liked_post_id) as liked_post_id FROM "public"."favorites" WHERE user_id = $1) AS "favorites"
				FROM "public"."users" WHERE users."id" = $1`, [user_id])

			// let user = await pool.query(`SELECT users."favorites", users."subscriptions", users."subscribers", users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address" FROM "public"."users" WHERE users."id" = $1`, [user_id])

			//SWIPESWIPESWIPE//SWIPESWIPESWIPE//SWIPESWIPESWIPE





			return user.rows[0]
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