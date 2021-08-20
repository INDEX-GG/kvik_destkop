import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		
		const main = async () => {
			const { id } = req.body
			//Добавить причину перемещения в архив
			await prisma.$queryRaw(`UPDATE posts SET active = false ,archived = true WHERE ID IN (${id})`)  //UPDATE posts SET ArchReason = ${reason}
			return { message: 'successfully update' };
		}

		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api reasonArchive${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		return res.status(405).json({ message: 'method not allowed' })
	}
}