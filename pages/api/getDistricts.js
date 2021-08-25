import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();
//hljb45
		const main = async () => {
			const id = req.body.id
			const idInt = Number(id)
			return await prisma.districts.findMany({
				where: {
					parent_id: idInt
				}
			})
		}

		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api getDistricts${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}