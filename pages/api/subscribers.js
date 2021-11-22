import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {

		const jwt = require("jsonwebtoken");
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).send("A token is required for authentication");
		}
		try {
			jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
		} catch (err) {
			return res.status(401).send("Invalid Token");
		}
		const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
		if (parseInt(req.body.user_id, 10) !== tokenUser) {
			return res.status(403).send("Invalid Token");
		}

		const prisma = new PrismaClient();

		const main = async () => {
			const user_id = req.body.user_id;
			const subscriber_id = req.body.subscriber_id;
			const userIdInt = Number(user_id);
			const subscribers = await prisma.users.findFirst({
				where: {
					id: userIdInt
				},
				select:
				{
					subscribers: true
				}
			});
			let answer = 'none';
			let preList = subscribers['subscribers'].substring(1);
			let preList2 = preList.substring(0, preList.length - 1);
			let list = preList2.split(',');
			if (list.includes(subscriber_id)) {
				var index = list.indexOf(subscriber_id)
				if (index > -1) {
					list.splice(index, 1)
					answer = 'delete'
				}
			} else {
				list.push(subscriber_id)
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
					subscribers: '[' + list.join() + ']'
				}
			}
			await prisma.users.update(obj);
			return answer;
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api subscribers${e}`)
			res.json('ошибка api subscribers', e)
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