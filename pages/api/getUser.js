import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	const prisma = new PrismaClient();
	if (req.method === 'POST') {

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
					subscriptions: true
				}
			})
		}

		main()
			.then(r => res.json(r ? { user: r } : { isset: false }))
			.catch(e => console.error(`ошибка api getUser${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})

	} else {
		return res.status(405).json({ message: 'method not allowed' })
	}
}