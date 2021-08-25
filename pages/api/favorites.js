import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			let message = 'error'
			const user_id = req.body.user_id
			const post_id = req.body.post_id
			const userIdInt = Number(user_id)
			let comment = req.body.comment
			const condition = req.body.condition
			if (req.body.comment === null || req.body.comment === undefined || req.body.comment === "undefined") {
				comment = ''
			}

			const favorites = await prisma.users.findFirst({
				where: {
					id: userIdInt
				},
				select:
				{
					favorites: true
				}
			})


			let list = JSON.parse(favorites['favorites'])
			if (list.some(item => item.post_id === post_id)) {
				for (let index in list) {
					if (list[index].post_id === post_id) {
						if (condition === 'false' && comment === '') {
							list.splice(index, 1)
							message = 'successfully delete'
						} else {
							list.splice(index, 1)
							list.push({ post_id: post_id, comment: comment, condition: condition })
							message = 'successfully update'
						}
					}
				}
			} else {
				list.push({ post_id: post_id, comment: comment, condition: condition })
				message = 'successfully add'
				if (condition === 'false' && comment === '') {
					list.pop()
					message = 'nothing reasons for add'
				}
			}
			const obj = {
				where:
				{
					id: userIdInt
				},
				data: {
					favorites: JSON.stringify(list)
				}
			}
			await prisma.users.update(obj);
			return message;
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api favorites${e}`)
			res.json('ошибка api favorites', e)
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