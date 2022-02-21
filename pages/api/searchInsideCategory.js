import {Pool} from "pg";

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const main = async () => {
			const category = req.body.category.toLowerCase();
			const page_limit = req.body.page_limit
			const page = (req.body.page - 1) * page_limit
			const text = req.body.text.toLowerCase();
			const sort = req.body.sort.toLowerCase()
			if (typeof req.body.page !== 'number' || typeof req.body.page_limit !== 'number') {
				throw "Er"
			}
			let sort_value
			switch (sort) {
				case 'default':
					sort_value = 'ORDER BY id desc'
					break;
				case 'new':
					sort_value = 'ORDER BY id desc'
					break;
				case 'price_by_ascending':
					sort_value = 'ORDER BY price asc'
					break;
				case 'price_by_descending':
					sort_value = 'ORDER BY price desc'
					break;
				default:
					sort_value = ''
					break;
			}
			let date = new Date()
			const region_includes = req.body.region_includes.toLowerCase()
			let region_excludes = req.body.region_excludes.toLowerCase()
			if (region_excludes === '') {
				region_excludes = '!'
			}
			const answer =  await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, posts.id, posts.user_id, posts.category_id, posts.price, posts.old_price, posts.photo, posts.rating, posts.created_at, posts.delivery, posts.reviewed, posts.address, posts.phone, posts.trade, posts.verify_moderator, posts.commercial, posts.secure_transaction, posts.title, posts.email, posts.viewing, posts.color_selection, posts.size_selection FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE ((active_time >= $1) OR (active_time IS NULL)) AND LOWER (category_id) LIKE $2 AND active = 0 AND verify = 0 AND (LOWER (title) LIKE $3 OR LOWER (description) LIKE $3) AND LOWER (city) LIKE $4 AND LOWER (city) NOT LIKE $5 ${sort_value} LIMIT $6 offset $7`, [new Date() ,category + '%', '%' + text + '%', region_includes + '%', region_excludes + '%', page_limit, page])

			answer.rows.forEach(
				element => {
					element.highlighting = element.color_selection >= date;
					element.selection_size = element.size_selection >= date;
					delete element.color_selection
					delete element.size_selection
				});

			return (answer.rows)
        }
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api searchInsideCategory ${e}`)
			res.json('ошибка api searchInsideCategory, ', e)
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