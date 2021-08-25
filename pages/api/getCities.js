import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			return await prisma.cities.findMany({
				skip: req.body.of,
				select: {
					id: true,
					name: true,
					parent_id: true,
				}
			})
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getCities${e}`)
			res.json('ошибка api getCities', e)
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