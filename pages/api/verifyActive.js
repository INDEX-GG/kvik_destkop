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


		// req.body.active
		// 0 - Активировать
		// 1 - Продано на Kvik
		// 2 - Продано в другом месте
		// 3 - Другая причина
		// 99 - Удалить


		const prisma = new PrismaClient();

		const main = async () => {
			let now = new Date()
			let now_iso = now.toISOString().slice(0, 19).replace('T', ' ');
			const id = req.body.id
			const active = parseInt(req.body.active)
			if (active === 0) {
				if (id.length > 1) {
					throw "Возможна активация только одного объявления"
				}
				let post_id = id[0]
				let post = await prisma.posts.findUnique({
					where: {
						id: post_id
					},
					select:
						{
							active_time: true,
                            archived_time: true,
							active: true
						}
				})
                let post_active_time = post.active_time
				let post_archived_time = post.archived_time
				let post_active = parseInt(post.active)
				let time_difference = post_active_time - post_archived_time
				if (time_difference <= 0) {
					throw "Время отрицательное"
				}
				if (post_active === 0) {
					let time_left = post_active_time - Math.floor(now)
					if (time_left <= 0) {

						let new_active_time = new Date(Math.floor(now) + time_difference)
						let new_active_time_iso = new_active_time.toISOString().slice(0, 19).replace('T', ' ');
						await prisma.$queryRaw(`UPDATE posts SET active = ${active}, active_time = '${new_active_time_iso}' WHERE ID IN (${id}) AND user_id = ${req.body.user_id}`)
						return { message: 'successfully update' }

					} else {
						throw "Обяъвление уже активно"
					}
				}

				let new_active_time = new Date(Math.floor(now) + time_difference)
				let new_active_time_iso = new_active_time.toISOString().slice(0, 19).replace('T', ' ');
				await prisma.$queryRaw(`UPDATE posts SET active = ${active}, active_time = '${new_active_time_iso}' WHERE ID IN (${id}) AND user_id = ${req.body.user_id}`)
				return { message: 'successfully update' }

			} else {
				await prisma.$queryRaw(`UPDATE posts SET active = ${active}, archived_time = '${now_iso}' WHERE ID IN (${id}) AND user_id = ${req.body.user_id}`)
				return { message: 'successfully update' }
			}
		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api verifyActive ${e}`)
			res.json('ошибка api verifyActive, ', e)
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