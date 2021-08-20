import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		const main = async () => {
			const id = req.body.id
			const idInt = Number(id)
			if (req.body.id === undefined || req.body.verify_moderator === undefined) {
				return res.status(400).json({ message: 'Insufficient body data' })
			}
			const exist = await prisma.posts.findFirst({
				where: {
					id: idInt,
				},
				select: {
					id: true,
				}
			})
			if (exist === null) {
				return res.status(400).json({ message: 'Post with this id dont exist' })
			}
			const ver = req.body.verify_moderator
			const array = []
			let arr = ver
			for (let value of arr) {
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
		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api verifymoder${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})

	} else {
		res.status(405).json({ message: 'method not allowed' })
		res.end()
	}
}