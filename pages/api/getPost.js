import {Pool} from "pg";

export default async function handler(req, res) {

	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const main = async () => {
			// const user_id = (req.body.user_id).toString()


			const answer  = await pool.query(`SELECT users."userPhoto",users.name, posts.user_id ,users.raiting, users.id,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email,posts.active, posts.subcategory, posts.viewing, posts.coordinates FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = ${+req.body.id}`)



			// for (let index in answer.rows) {
			//     let views = (answer.rows[index]).viewing
			//     let preList = views.substring(1);
			//     let preList2 = preList.substring(0, preList.length - 1);
			//     let list = preList2.split(',');
			//     if (list.includes(user_id)) {
			//         (answer.rows[index]).viewing_bool = true
			//     } else {
			//         (answer.rows[index]).viewing_bool = false
			//     }
			// }


			return(answer.rows[0])
		}
		try {
			const response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api getPost ${e}`)
			res.json('ошибка api getPost, ', e)
			res.status(405).end();
		}
		finally {
			await pool.end();
		}
	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}