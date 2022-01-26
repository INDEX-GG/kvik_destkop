import {Pool} from "pg";
import axios from "axios";

export default async function handler(req, res) {
	if (req.method === 'POST') {


		// const jwt = require("jsonwebtoken");
		// const token = req.headers["x-access-token"];
		// if (!token) {
		// 	return res.status(403).send("A token is required for authentication");
		// }
		// try {
		// 	jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
		// } catch (err) {
		// 	return res.status(401).send("Invalid Token");
		// }
		// const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
		// if (parseInt(req.body.user_id, 10) !== tokenUser) {
		// 	return res.status(403).send("Invalid Token");
		// }


		const pool = new Pool({ connectionString: process.env.DATABASE_URL });
		const main = async () => {
			let date = new Date()
			const post_id = req.body.id
			if (typeof post_id !== 'number') {
				throw "Er"
			}


			const answer  = await pool.query(`SELECT users."userPhoto",users.name, posts.user_id ,users.raiting, users.id,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email,posts.active, posts.subcategory, posts.coordinates, posts.active_time, 
				(SELECT COUNT("posts"."id") FROM "public"."posts" WHERE "posts"."user_id" = "users"."id" AND "posts"."id" != $2 AND "posts"."active" = 0 AND "posts"."verify" = 0 AND (("posts"."active_time" >= $1) OR ("posts"."active_time" IS NULL))) AS "user_products_count",
   				array(SELECT row_to_json(t)FROM(SELECT "posts"."id", "posts"."title", "posts"."price", "posts"."photo"  FROM "public"."posts" WHERE "posts"."user_id" = "users"."id" AND "posts"."active" = 0 AND "posts"."verify" = 0 AND "posts"."id" != $2 AND (("posts"."active_time" >= $1) OR ("posts"."active_time" IS NULL)) ORDER BY "posts"."id" desc LIMIT 3) t) AS user_products
				FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = $2`, [date ,post_id])



			const subcategory = answer.rows[0]['subcategory']
			answer.rows[0]['additional_fields'] = null
			if (subcategory !== null) {
				for (let symbol of subcategory) {
					if (["_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].includes(symbol) === false) {
						throw "Er"
					}
				}
				try {
					const subs = (await pool.query(`SELECT * FROM "subcategories"."${subcategory}" WHERE post_id = $1`, [post_id])).rows
					let additional_fields = subs[0]
					if (additional_fields !== undefined) {
						answer.rows[0]['additional_fields'] = additional_fields
					}
				}
				catch (e) {
					console.error(`Внутренняя ошибка api getPost ${e}`)
				}
			}


			let post = answer.rows[0]

			// Получение значений счетчика

			try {
				const clickhouse_url = process.env.NEXT_PUBLIC_CLHS

				const jwt = require("jsonwebtoken");
				const token = req.headers["x-access-token"];
				if (!token) {
					const clickhouse_data = `SELECT 'last_day_viewing_count' as type, count(post_id) FROM clickstream WHERE timestamp = toStartOfDay(now()) AND post_id = ` + post_id + ` UNION ALL SELECT 'all_time_viewing_count' as type, count(post_id) FROM clickstream WHERE post_id = ` + post_id + ` FORMAT JSON`
					let clickhouse_answer = await axios.post(clickhouse_url, clickhouse_data).then(r => r.data)
					post.all_time_viewing_count = clickhouse_answer.data.find(e => e.type === "all_time_viewing_count")["count(post_id)"]
					post.last_day_viewing_count = clickhouse_answer.data.find(e => e.type === "last_day_viewing_count")["count(post_id)"]
					post.full_stat = false
				} else {
					try {
						jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
						const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
						if (parseInt(post.user_id) !== tokenUser) {
							const clickhouse_data = `SELECT 'last_day_viewing_count' as type, count(post_id) FROM clickstream WHERE timestamp = toStartOfDay(now()) AND post_id = ` + post_id + ` UNION ALL SELECT 'all_time_viewing_count' as type, count(post_id) FROM clickstream WHERE post_id = ` + post_id + ` FORMAT JSON`
							let clickhouse_answer = await axios.post(clickhouse_url, clickhouse_data).then(r => r.data)
							post.all_time_viewing_count = clickhouse_answer.data.find(e => e.type === "all_time_viewing_count")["count(post_id)"]
							post.last_day_viewing_count = clickhouse_answer.data.find(e => e.type === "last_day_viewing_count")["count(post_id)"]
							post.full_stat = false
						} else {
							const clickhouse_data = `SELECT 'last_day_viewing_count' as type, count(post_id) FROM clickstream WHERE timestamp = toStartOfDay(now()) AND post_id = ` + post_id + ` UNION ALL SELECT 'all_time_viewing_count' as type, count(post_id) FROM clickstream WHERE post_id = ` + post_id + ` UNION ALL SELECT 'last_day_contact_count' as type, count(post_id) FROM contactstream WHERE timestamp = toStartOfDay(now()) AND post_id = ` + post_id + ` UNION ALL SELECT 'all_time_contact_count' as type, count(post_id) FROM contactstream WHERE post_id = ` + post_id + ` FORMAT JSON`
							let clickhouse_answer = await axios.post(clickhouse_url, clickhouse_data).then(r => r.data)
							const likes_count = await pool.query(`SELECT COUNT(liked_post_id) FROM "public"."favorites" WHERE liked_post_id = $1`, [post_id])

							post.all_time_viewing_count = clickhouse_answer.data.find(e => e.type === "all_time_viewing_count")["count(post_id)"]
							post.last_day_viewing_count = clickhouse_answer.data.find(e => e.type === "last_day_viewing_count")["count(post_id)"]
							post.all_time_contact_count = clickhouse_answer.data.find(e => e.type === "all_time_contact_count")["count(post_id)"]
							post.last_day_contact_count = clickhouse_answer.data.find(e => e.type === "last_day_contact_count")["count(post_id)"]
							post.likes_count = (parseInt(likes_count.rows[0].count))
							post.full_stat = true
						}
					} catch (err) {
						const clickhouse_data = `SELECT 'last_day_viewing_count' as type, count(post_id) FROM clickstream WHERE timestamp = toStartOfDay(now()) AND post_id = ` + post_id + ` UNION ALL SELECT 'all_time_viewing_count' as type, count(post_id) FROM clickstream WHERE post_id = ` + post_id + ` FORMAT JSON`
						let clickhouse_answer = await axios.post(clickhouse_url, clickhouse_data).then(r => r.data)
						post.all_time_viewing_count = clickhouse_answer.data.find(e => e.type === "all_time_viewing_count")["count(post_id)"]
						post.last_day_viewing_count = clickhouse_answer.data.find(e => e.type === "last_day_viewing_count")["count(post_id)"]
						post.full_stat = false
					}
				}

			} catch (e) {
				post.all_time_viewing_count = 0
				post.last_day_viewing_count = 0
				post.full_stat = false
				console.error(`Внутренняя ошибка api getPost (clhs) ${e}`)
			}
			let post_active = parseInt(post.active)
			let post_active_time = post.active_time
			let day_in_ms = 1000*60*60*24
			post.best_before = Math.ceil((post_active_time - new Date())/day_in_ms)
			post.archive = !(post_active === 0 && post_active_time > new Date())
			return(answer.rows[0])
		}
		try {
			const response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getPost ${e}`)
			res.json('ошибка api getPost, ', e)
			res.status(405).end();
		}
		finally {
			await pool.end();
		}
	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}
