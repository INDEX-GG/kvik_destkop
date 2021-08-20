import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

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

			if (results['subcategory'] != null && results['subcategory'] != '') {
				const subs = await prisma.$queryRaw(`SELECT * FROM ${resultName} WHERE post_id = '${req.body.post_id}'`)
				return subs;
			} else {
				return { message: 'error' };
			}
		}

		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api subcategoriesFields${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}