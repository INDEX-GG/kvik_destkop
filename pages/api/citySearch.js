import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async() => {
			let { name } = req.body
			const lowername = name.toLowerCase()
			const cities = await prisma.$queryRaw(`SELECT id, name, parent_id FROM cities WHERE LOWER (name) LIKE '${lowername}%' LIMIT 15`)     // LIMIT?
			const citiesMiddle = await prisma.$queryRaw(`SELECT id, name, parent_id FROM cities WHERE LOWER (name) LIKE '%${lowername}%' AND LOWER (name) NOT LIKE '${lowername}%' LIMIT 15`)
			const RES = []
			for (let value of cities) {
				if (value.parent_id == "0") {
					RES.push({ object: value })
				} else {
					const parentNum = parseInt(value.parent_id)
					const results1 = await prisma.cities.findFirst({
						where: {
							id: parentNum
						}
					})
					if (((results1).parent_id) == 0 || ((results1).parent_id) == null) {
						RES.push({ object: value, grandparent: results1 })
					} else {
						const parentNum2 = parseInt(results1.parent_id)
						const results2 = await prisma.cities.findFirst({
							where: {
								id: parentNum2
							}
						})
						RES.push({ object: value, parent: results1, grandparent: results2 })
					}
				}
			}
			for (let value of citiesMiddle) {
				if (value.parent_id == "0") {
					RES.push({ object: value })
				} else {
					const parentNum = parseInt(value.parent_id)
					const results1 = await prisma.cities.findFirst({
						where: {
							id: parentNum
						}
					})
					if (((results1).parent_id) == 0 || ((results1).parent_id) == null) {
						RES.push({ object: value, grandparent: results1 })
					} else {
						const parentNum2 = parseInt(results1.parent_id)
						const results2 = await prisma.cities.findFirst({
							where: {
								id: parentNum2
							}
						})
						RES.push({ object: value, parent: results1, grandparent: results2 })
					}
				}
			}
			return RES
		}
		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api citySearch${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}