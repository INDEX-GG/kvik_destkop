import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		const main = async () => {
			async function getSub() {
				return await prisma.posts.findFirst({
					where: {
						id: Number(req.body.post_id)
					},
					select: {
						subcategory: true,
					}
				})
			}
			const results = await getSub();
			const resultName = results['subcategory'];

			if (results['subcategory'] != null && results['subcategory'] !== '') {
				const subs = await prisma.$queryRaw(`SELECT * FROM ${resultName} WHERE post_id = '${req.body.post_id}'`)
				console.log((subs[0])['id']);
				let dict = subs[0]
				for (var key in dict){
					if (dict[key] === false) {
						delete dict[key]
					}
				}
				return dict;
			} else {
				return { message: 'error' };
			}
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api subcategoryFields${e}`)
			res.json('ошибка api subcategoryFields', e)
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