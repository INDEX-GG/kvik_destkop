import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {

			const name = 'комнаты'
			const searchResults = await prisma.$queryRaw(`SELECT name FROM categories WHERE name LIKE '%${name}%' LIMIT 5`)
			console.log(searchResults)

			//Этот запрос нужно будет связать с таблицей
			async function getPost(ids) {
				return await prisma.$queryRaw(`SELECT title,category_id,name FROM posts JOIN categories ON title ~* '${ids}' AND categories.id = posts.category_id AND posts.active = true AND posts.verify = 1 GROUP BY title,category_id,name`)
			}
			console.log("data", req.body)
			const results = await getPost(req.body.product_name);
			console.log(results)

			return { result: results };
		}

		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api search${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}