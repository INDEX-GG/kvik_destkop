import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			// Передлать для определния того,что не правильно, логин или пароль 
			return await prisma.users.findUnique({
				where: {
					id: req.body.id
				},
				select:
				{
					name: true,
					userPhoto: true,
					about: true,
					createdAt: true,
					phone: true,
					email: true,
					raiting: true,
					favorites: true,
					subscriptions: true,
					location: true
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
			console.error(`ошибка api getUser${e}`)
			res.json('ошибка api getUser', e)
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