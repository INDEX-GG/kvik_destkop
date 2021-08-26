import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const user_id = req.body.user_id
			const userIdInt = Number(user_id)
			let fav = await prisma.users.findFirst({
				where: {
					id: userIdInt
				}
			})
			if (fav.favorites == null || fav.favorites === '' || fav.favorites === '[]') {
				return { "message": "nothing" };
			}
			const list = JSON.parse(fav.favorites)
			let postsList = []
			for (let index in list) {
				postsList.push((list[index]).post_id)
			}
			let productsList = await prisma.$queryRaw(`SELECT * FROM posts WHERE id IN (${postsList})`)
			let peopleList = []
			for (let index1 in productsList) {
				peopleList.push((productsList[index1]).user_id)
			}
			let sellersList = await prisma.$queryRaw(`SELECT id, name, "userPhoto", blocked, raiting FROM users WHERE id IN (${peopleList})`)
			let posts = []
			for (let index2 in productsList) {
				let postData = productsList[index2]
				for (let index3 in sellersList) {
					(sellersList[index3])
					if ((productsList[index2]).user_id === (sellersList[index3]).id) {
						postData.user_name = (sellersList[index3]).name
						postData.user_photo = (sellersList[index3]).userPhoto
						postData.user_blocked = (sellersList[index3]).blocked
						for (let index4 in list) {
							if ((productsList[index2]).id == (list[index4]).post_id) {
								postData.comment = (list[index4]).comment
								postData.condition = (list[index4]).condition
							}
						}

						posts.push(postData)
					}
				}
			}
			return { posts: posts }
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