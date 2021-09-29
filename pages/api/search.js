import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {

			// const name = 'комнаты'
			// const searchResults = await prisma.$queryRaw(`SELECT name FROM categories WHERE name LIKE '%${name}%' LIMIT 5`)

			//Этот запрос нужно будет связать с таблицей
			async function getPost(ids) {
				return await prisma.$queryRaw(`SELECT title,category_id,name FROM posts JOIN categories ON title ~* '${ids}' AND categories.id = posts.category_id AND posts.active = true AND posts.verify = 1 GROUP BY title,category_id,name`)
			}

			const results = await getPost(req.body.product_name);
			return { result: results };
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api search${e}`)
			res.json('ошибка api search', e)
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