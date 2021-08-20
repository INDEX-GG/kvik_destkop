import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		const main = async () => {
			const { id, phone } = req.body
			const idInt = Number(id)
			const obj = {
				where:
				{
					id: idInt
				},
				data: {
					phone: phone
				}
			}
			await prisma.users.update(obj);
			return { message: "successfully update" };
		}
		main()
			.then(r => res.json(r))
			.catch(e => console.error(`ошибка api upTelephone${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})
	}
	else {
		return res.status(405).json({ message: 'method not allowed' })
	}
}