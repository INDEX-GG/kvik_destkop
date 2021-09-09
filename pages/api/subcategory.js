import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	console.log(req.body)
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const data = req.body
			const key = (Object.keys(data))[0]
			const array = data[key]
			let columns = ''
			let values = ''
			array.forEach((element) => {
				if (element.fields !== '') {
					columns += '"' + element.alias + '", '
					values += "'" + element.fields + "', "
				}
			})
			columns = columns.slice(0, -2)
			values = values.slice(0 ,-2)
			await prisma.$queryRaw(`INSERT INTO ${key} (${columns}) VALUES (${values})`)
			return{ message: 'successfully update' };
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api subcategory${e}`)
			res.json('ошибка api subcategory', e)
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