import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async() => {

			const user_id = req.body.user_id
			const userIdInt = Number(user_id)

			let sub = await prisma.$queryRaw(`SELECT subscribers FROM users WHERE id = ${userIdInt}`)
			if (sub[0].subscribers == null || sub[0].subscribers === '' || sub[0].subscribers === '[]') {
				return { "message": "nothing" };
			}
			const subscribers = await prisma.users.findFirst({
				where: {
					id: userIdInt
				}
			})
			
			let preList = subscribers['subscribers'].substring(1)
			let preList2 = preList.substring(0, preList.length - 1)
			let list = preList2.split(',')
			let humans = []

			for (var index in list) {
				const human = await prisma.users.findFirst({
					where: {
						id: Number(list[index])
					},
					select: {
						id: true,
						name: true,
						userPhoto: true,
						raiting: true
					}
				})
				if (human !== null) {
					humans.push(human)
				}
			}
			return humans;
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getSubscribers${e}`)
			res.json('ошибка api getSubscribers', e)
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