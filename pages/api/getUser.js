import {Pool} from "pg"

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL })

		const main = async () => {
			const user_id = req.body.id




			//SWIPESWIPESWIPE//SWIPESWIPESWIPE//SWIPESWIPESWIPE
			//
			// let user = await pool.query(`SELECT users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address" FROM "public"."users" WHERE users."id" = $1`, [user_id])
			// let user_obj = user.rows[0]
			// let favorites = await pool.query(`SELECT array_agg(liked_post_id) as liked_post_id FROM "public"."favorites" WHERE user_id = $1`, [user_id])
			// let subscriptions = await pool.query(`SELECT COUNT(subscription) FROM "public"."subscriptions" WHERE user_id = $1`, [user_id])
			// let subscribers = await pool.query(`SELECT COUNT(user_id) FROM "public"."subscriptions" WHERE subscription = $1`, [user_id])
			//
			//
			//
			//
			// let active_posts  = await pool.query(`SELECT COUNT(id) FROM "posts" WHERE active = 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL))`, [user_id, new Date()])
			// let archive_posts = await pool.query(`SELECT COUNT(id) FROM "posts" WHERE active != 0 AND verify = 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL))`, [user_id, new Date()])
			// let wait_posts = await pool.query(`SELECT COUNT(id) FROM "posts" WHERE verify != 0  AND posts.user_id = $1 AND ((active_time >= $2) OR (active_time IS NULL))`, [user_id, new Date()])
			//
			// user_obj.search_count = 0
			// user_obj.favorites = favorites.rows[0].liked_post_id
			// user_obj.favorites_count = favorites.rows[0].liked_post_id.length
			// user_obj.subscriptions_count = parseInt(subscriptions.rows[0].count)
			// user_obj.subscribers_count = parseInt(subscribers.rows[0].count)
			// user_obj.active_posts_count = parseInt(active_posts.rows[0].count)
			// user_obj.wait_posts_count = parseInt(wait_posts.rows[0].count)
			// user_obj.archive_posts_count = parseInt(archive_posts.rows[0].count)







			let user = await pool.query(`SELECT users."favorites", users."subscriptions", users."subscribers", users."name", users."userPhoto", users."about", users."createdAt", users."phone", users."email", users."raiting", users."location", users."address" FROM "public"."users" WHERE users."id" = $1`, [user_id])
			let user_obj = user.rows[0]

			//SWIPESWIPESWIPE//SWIPESWIPESWIPE//SWIPESWIPESWIPE





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