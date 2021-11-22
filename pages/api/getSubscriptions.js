import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {

		const prisma = new PrismaClient();

		const main = async () => {
			const user_id = req.body.user_id
			const userIdInt = Number(user_id)
			const subscriptions = await prisma.users.findFirst({
				where: {
					id: userIdInt
				}
			})
			if (subscriptions.subscriptions == null || subscriptions.subscriptions === '' || subscriptions.subscriptions === '[]') {
				return { "message": "nothing" };
			}
			let a = ((subscriptions.subscriptions).slice(1, -1)).split(",").map(Number)
			let sellersList = await prisma.$queryRaw(`SELECT id, name, "userPhoto", raiting FROM users WHERE id IN (${a})`)
			let productsList = await prisma.$queryRaw(`SELECT id, user_id, title, price, photo FROM posts WHERE user_id IN (${a}) AND active = 0 AND verify = 0`)
			let sellers = []
			for (let index in sellersList) {
				let seller = sellersList[index]
				seller.poducts = []
				for (let index1 in productsList) {
					if ((sellersList[index]).id === (productsList[index1]).user_id) {
						(seller.poducts).push({ id: (productsList[index1]).id, title: (productsList[index1]).title, price: (productsList[index1]).price, photo: (productsList[index1]).photo })
					}
				}
				sellers.push(seller)
			}
			return sellers

		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getSubscriptions${e}`)
			res.json('ошибка api getSubscriptions', e)
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