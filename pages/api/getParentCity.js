import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			let { name, parent_id } = req.body
			const exist = await prisma.cities.findFirst({
				where: {
					name: name
				}
			})
			if (exist === null) {
				return { message: 'the city does not exist' };
			} else if (parent_id == "0") {
				return { message: 'this is country' }
			} else {
				const parentNum = parseInt(parent_id)
				const results1 = await prisma.cities.findFirst({
					where: {
						id: parentNum
					}
				})
				if (((results1).parent_id) == 0) {
					return { country: results1 }
				} else {
					const parentNum2 = parseInt(results1.parent_id)
					const results2 = await prisma.cities.findFirst({
						where: {
							id: parentNum2
						}
					})
					return { country: results2, region: results1 }
				}
			}
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getParentCity ${e}`)
			res.json('ошибка api getParentCity, ', e)
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