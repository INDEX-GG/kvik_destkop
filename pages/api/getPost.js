import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			//Этот запрос нужно будет связать с таблицей
			const getPost = async (id) => {
				return await prisma.$queryRaw(`WITH ver AS ( SELECT * FROM "posts" WHERE id = ${id}) SELECT users."userPhoto",users.name, posts.user_id ,users.raiting, users.id,posts.secure_transaction,posts.description,verifed.desc,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email,posts.active, posts.subcategory FROM "ver","posts","verifed","users" WHERE (ver.verify = verifed.id) AND (posts.id = ${id}) AND (users.id = posts.user_id)`)
			}

			return await getPost(+req.body.id);
		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response[0]))
		}
		catch (e) {
			console.error(`ошибка api getPost${e}`)
			res.json('ошибка api getPost', e)
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