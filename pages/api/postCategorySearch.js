import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const data = req.body.data.toLowerCase();
			const page_limit = req.body.page_limit
			const page = (req.body.page - 1) * page_limit
			return await prisma.$queryRaw(`SELECT * FROM posts WHERE LOWER (category_id) LIKE '${data}%' AND active = 0 AND verify = 0 ORDER BY id desc LIMIT ${page_limit} offset ${page}`)
			// return  await  prisma.$queryRaw(`SELECT * FROM "posts" WHERE active = 0 ORDER BY id desc LIMIT ${page_limit} offset ${page}`)

		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api postCategorySearch${e}`)
			res.json('ошибка api postCategorySearch', e)
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