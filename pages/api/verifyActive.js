import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const id = req.body.id
			const verify = "'" + req.body.verify + "'"
			await prisma.$queryRaw(`UPDATE posts SET active = ${verify} WHERE ID IN (${id})`)
			return { message: 'successfully update' }
		}
		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api verifyActive${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})

	} else {
		res.status(405).json({ message: 'method not allowed' })
		res.end()
	}
}