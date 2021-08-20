import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			//Этот запрос нужно будет связать с таблицей
			const getPost = async (ids) => {
				return await prisma.$queryRaw(`WITH ver AS ( SELECT * FROM "posts" WHERE id = ${ids}) SELECT users."userPhoto",users.name, posts.user_id ,users.raiting, users.id,posts.secure_transaction,posts.description,verifed.desc,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email, posts.subcategory FROM "ver","posts","verifed","users" WHERE (ver.verify = verifed.id) AND (posts.id = ${ids}) AND (users.id = posts.user_id)`)
			}
			return await getPost(+req.body.product_id);
		}

		main()
			.then(r => res.json({ result: r }))
			.catch(e => console.error(`ошибка api getPost${e}`))
			.finally(async () => {
				await prisma.$disconnect()
			})

	} else {
		res.status(405).json({ message: 'method not allowed' })
	}
}