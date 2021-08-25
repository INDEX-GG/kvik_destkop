import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			return await prisma.posts.findMany({
				where: {
					user_id: req.body.user_id,
					archived: false,
					verify: 1
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

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api waitActive${e}`)
			res.json('ошибка api waitActive', e)
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