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

		const main = async() => {
			const user_id = req.body.user_id
			const userIdInt = Number(user_id)
			const subscribers = await prisma.users.findFirst({
				where: {
					id: userIdInt
				}
			})
			if (subscribers.subscribers == null || subscribers.subscribers === '' || subscribers.subscribers === '[]') {
				return { "message": "nothing" };
			}
			let a = ((subscribers.subscribers).slice(1, -1)).split(",").map(Number)
			let humanList = await prisma.$queryRaw(`SELECT id, name, "userPhoto", raiting FROM users WHERE id IN (${a})`)
			return humanList
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