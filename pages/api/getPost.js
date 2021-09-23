import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const user_id = (req.body.user_id).toString()
			let getPost = await prisma.$queryRaw(`WITH ver AS ( SELECT * FROM "posts" WHERE id = ${+req.body.id}) SELECT users."userPhoto",users.name, posts.user_id ,users.raiting, users.id,posts.secure_transaction,posts.description,verifed.desc,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email, posts.subcategory, posts.viewing FROM "ver","posts","verifed","users" WHERE (ver.verify = verifed.id) AND (posts.id = ${+req.body.id}) AND (users.id = posts.user_id)`)
			let views = getPost[0].viewing
			let preList = views.substring(1);
			let preList2 = preList.substring(0, preList.length - 1);
			let list = preList2.split(',');
			if (list.includes(user_id)) {
				getPost[0].viewing_bool = true
			} else {
				getPost[0].viewing_bool = false
			}
			return await getPost;
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