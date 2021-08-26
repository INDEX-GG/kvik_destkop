import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		
		const main = async () => {
			const { id } = req.body
			//Добавить причину перемещения в архив
			await prisma.$queryRaw(`UPDATE posts SET active = false ,archived = true WHERE ID IN (${id})`)  //UPDATE posts SET ArchReason = ${reason}
			return { message: 'successfully update' };
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api reasonArchive${e}`)
			res.json('ошибка api reasonArchive', e)
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