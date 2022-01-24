import {Pool} from "pg";

export default async function handler(req, res) {

	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const main = async() => {
			//Этот запрос нужно будет связать с таблицей
			const getPost = async(ids) => {
				let now_iso = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
				const post_exclude = req.body.post_id
				return await pool.query(`SELECT posts.archived,users."userPhoto",posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts","users" WHERE (user_id = $1) AND (users.id = user_id) AND posts.active = 0 AND posts.verify = 0 AND posts.id != $2 AND ((active_time >= '${now_iso}') OR (active_time IS NULL)) ORDER BY id desc LIMIT 3`, [ids ,post_exclude])
			}
			return await getPost(+req.body.user_id);


		}

			try {
				const response = await main();
				res.status(200);
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(response))
			}
			catch (e) {
				console.error(`ошибка api getProductOfUser ${e}`)
				res.json('ошибка api getProductOfUser, ', e)
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