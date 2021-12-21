import {Pool} from "pg";

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const main = async () => {
			// const categoryId = req.body.category_id
			// const categoryIdInt = Number(categoryId)
			// const text = req.body.text.toLowerCase()
			//
			// // Поиск по всем категориям по совпадениям title, description
			// if (categoryId == undefined || categoryId == '') {
			// 	const results = await prisma.$queryRaw(`SELECT id, category_id, price, photo, rating, created_at, delivery, reviewed, address, phone, trade, verify_moderator, commercial, secure_transaction, title, email FROM posts WHERE LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%'`)
			// 	return { results: results };
			// 	// Поиск по категории из тела по совпадениям title, description
			// } else {
			// 	const results = await prisma.$queryRaw(`SELECT id, category_id, price, photo, rating, created_at, delivery, reviewed, address, phone, trade, verify_moderator, commercial, secure_transaction, title, email FROM posts WHERE category_id = ${categoryIdInt} AND LOWER (title) LIKE '%${text}%' OR category_id = ${categoryIdInt} AND LOWER (description) LIKE '%${text}%'`)
			// 	return { results: results };
			// }
			const category = req.body.category.toLowerCase();
			const page_limit = req.body.page_limit
			const page = (req.body.page - 1) * page_limit
			const text = req.body.text.toLowerCase();
			const sort = req.body.sort.toLowerCase()
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
			const region_includes = req.body.region_includes.toLowerCase()
			let region_excludes = req.body.region_excludes.toLowerCase()
			if (region_excludes === '') {
				region_excludes = '!'
			}
			return await pool.query(`SELECT * FROM posts WHERE LOWER (category_id) LIKE '${category}%' AND active = 0 AND verify = 0 AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') AND LOWER (city) LIKE '${region_includes}%' AND LOWER (city) NOT LIKE '%${region_excludes}' ${sort_value} desc LIMIT ${page_limit} offset ${page}`)
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