import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {

			const user_id = req.body.user_id;
			const seller_id = req.body.seller_id;
			const userIdInt = Number(user_id);

			let sub = await prisma.$queryRaw(`SELECT subscriptions FROM users WHERE id = ${userIdInt}`)
			if (sub[0].subscriptions == null || sub[0].subscriptions === '') {
				const obj = {
					where:
					{
						id: userIdInt
					},
					data: {
						subscriptions: '[]'
					}
				}
				await prisma.users.update(obj);
			}
			const subscriptions = await prisma.users.findFirst({
				where: {
					id: userIdInt
				},
				select:
				{
					subscriptions: true
				}
			})
			let answer = 'none'
			let preList = subscriptions['subscriptions'].substring(1)
			let preList2 = preList.substring(0, preList.length - 1)
			let list = preList2.split(',')
			if (list.includes(seller_id)) {
				var index = list.indexOf(seller_id)
				if (index > -1) {
					list.splice(index, 1)
					answer = 'delete'
				}
			} else {
				list.push(seller_id)
				answer = 'post'
			}

			var index_1 = list.indexOf('')
			if (index_1 > -1) {
				list.splice(index_1, 1)
			}

			const obj = {
				where:
				{
					id: userIdInt
				},
				data: {
					subscriptions: '[' + list.join() + ']'
				}
			}
			await prisma.users.update(obj);
			return answer;
		}
		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api subscriptions${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}