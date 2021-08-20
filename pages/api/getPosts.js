import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			return await prisma.posts.findMany({
				skip: req.body.of,
				take: 50,
				select: {
					id: true,
					user_id: true,
					category_id: true,
					price: true,
					old_price: true,
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
			.then(r => res.json({ result: r }))
			.catch(e => console.error(`ошибка api getPosts${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
			
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}