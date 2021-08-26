import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const user_id = req.body.user_id
			const userIdInt = Number(user_id)

			let fav = await prisma.$queryRaw(`SELECT favorites FROM users WHERE id = ${userIdInt}`)
			let list = JSON.parse(fav[0].favorites)

			if (fav[0].favorites == null || fav[0].favorites === '' || fav[0].favorites === '[]') {
				return { "message": "nothing" };
			}
			let posts = []
			for (let index in list) {
				let postData = await prisma.posts.findFirst({
					where: {
						id: Number(list[index].post_id)
					}
				})
				if (postData !== null) {
					const userData = await prisma.users.findFirst({
						where: {
							id: Number(postData.user_id)
						},
						select: {
							id: true,
							name: true,
							userPhoto: true,
							blocked: true,
						}
					})
					if (userData !== null) {
						postData.user_name = userData.name
						postData.user_photo = userData.userPhoto
						postData.user_blocked = userData.blocked
						postData.comment = list[index].comment
						postData.condition = list[index].condition
						posts.push(postData)
					}
				}
			}

			return { posts: posts };
		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getFavorites${e}`)
			res.json('ошибка api getFavorites', e)
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