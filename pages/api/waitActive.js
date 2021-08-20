import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			//Этот запрос нужно будет связать с таблицей

			return await prisma.findMany({
				where: {
					user_id: req.body.user_id,
					archived: false,
					verify: true
				},
				select: {
					id: true,
					category_id: true,
					price: true,
					photo: true,
					rating: true,
					created_at: true,
					delivery: true,
					reviewed: true,
					address: true,
					phone: true,
					trade: true,
					verify_moderator: true,
					commercial: true,
					secure_transaction: true,
					title: true,
					email: true
				}
			})
		}

		main()
			.then(r => res.json({ results: r }))
			.catch(e => console.error(`ошибка api waitActive${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}