import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

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

		main()
			.then(r => res.json({ result: r }))
			.catch(e => console.error(`ошибка api gerCities${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}