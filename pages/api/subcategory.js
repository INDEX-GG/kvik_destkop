import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const data = req.body
			const key = (Object.keys(data))[0]
			const array = data[key]
			let columns = ''
			let values = ''
			array.forEach((element) => {
				columns += element.alias + ", "
				values += element.fields + ", "
			})
			columns += (Object.keys(data))[1]
			values += data[(Object.keys(data))[1]]
			await prisma.$queryRaw(`INSERT INTO ${key} (${columns}) VALUES (${values})`)
			return{ message: 'successfully update' };
		}
		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api subcategory${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		return res.status(405).json({ message: 'method not allowed' })
	}
}