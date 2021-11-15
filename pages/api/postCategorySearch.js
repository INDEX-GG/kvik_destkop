import {Pool} from "pg";

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const main = async () => {
			const data = req.body.data.toLowerCase();
			const page_limit = req.body.page_limit
			const page = (req.body.page - 1) * page_limit
			const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, posts.id, posts.user_id, posts.category_id, posts.price, posts.old_price, posts.photo, posts.rating, posts.created_at, posts.delivery, posts.reviewed, posts.address, posts.phone, posts.trade, posts.verify_moderator, posts.commercial, posts.secure_transaction, posts.title, posts.email, posts.viewing FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE LOWER (category_id) LIKE '${data}%' AND active = 0 AND verify = 0 ORDER BY id desc LIMIT ${page_limit} offset ${page}`)
			return(answer.rows)
			// return  await  prisma.$queryRaw(`SELECT * FROM "posts" WHERE active = 0 ORDER BY id desc LIMIT ${page_limit} offset ${page}`)

		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api postCategorySearch ${e}`)
			res.json('ошибка api postCategorySearch', e)
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