import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

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
			return await prisma.$queryRaw(`SELECT * FROM posts WHERE LOWER (category_id) LIKE '${category}%' AND active = 0 AND verify = 0 AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') ORDER BY id desc LIMIT ${page_limit} offset ${page}`)
			
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api searchInsideCategory${e}`)
			res.json('ошибка api searchInsideCategory', e)
			res.status(405).end();
		}
		finally {
			await prisma.$disconnect();
		}

	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}