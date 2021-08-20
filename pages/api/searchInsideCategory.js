import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const categoryId = req.body.category_id
			const categoryIdInt = Number(categoryId)
			const text = req.body.text.toLowerCase()

			// Поиск по всем категориям по совпадениям title, description
			if (categoryId == undefined || categoryId == '') {
				const results = await prisma.$queryRaw(`SELECT id, category_id, price, photo, rating, created_at, delivery, reviewed, address, phone, trade, verify_moderator, commercial, secure_transaction, title, email FROM posts WHERE LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%'`)
				return { results: results };
				// Поиск по категории из тела по совпадениям title, description
			} else {
				const results = await prisma.$queryRaw(`SELECT id, category_id, price, photo, rating, created_at, delivery, reviewed, address, phone, trade, verify_moderator, commercial, secure_transaction, title, email FROM posts WHERE category_id = ${categoryIdInt} AND LOWER (title) LIKE '%${text}%' OR category_id = ${categoryIdInt} AND LOWER (description) LIKE '%${text}%'`)
				return { results: results };
			}
		}

		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api searchInsideCategory${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})

	} else {
		res.status(405).json({ message: 'method not allowed' })
		res.end()
	}
}