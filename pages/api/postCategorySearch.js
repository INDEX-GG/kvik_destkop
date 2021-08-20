import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const data = req.body.data.toLowerCase();
			return await prisma.$queryRaw(`SELECT * FROM posts WHERE LOWER (category_id) LIKE '${data}%' LIMIT 15`)     // LIMIT?
		}

		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api postCategorySearch${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}