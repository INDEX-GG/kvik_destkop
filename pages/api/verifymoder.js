import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		const main = async () => {
			const id = req.body.id
			const idInt = Number(id)
			const ver = req.body.verify_moderator
			const array = []
			for (let value of ver) {
				array.push(value.toString())
			}
			const verify = { "verify": array }
			const obj = {
				where:
				{
					id: idInt
				},
				data: {
					verify_moderator: verify
				}
			}
			await prisma.posts.update(obj);
			return { message: "successfully update" };
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api verifymoder${e}`)
			res.json('ошибка api verifymoder', e)
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