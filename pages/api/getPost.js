import {Pool} from "pg";

export default async function handler(req, res) {

	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });
		const main = async () => {
			if (typeof req.body.id !== 'number') {
				return("err")
			}
			const answer  = await pool.query(`SELECT users."userPhoto",users.name, posts.user_id ,users.raiting, users.id,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email,posts.active, posts.subcategory, posts.viewing, posts.coordinates FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = $1`, [req.body.id])
			const subcategory = answer.rows[0]['subcategory']
			answer.rows[0]['additional_fields'] = null
			if (subcategory !== null) {
				for (let symbol of subcategory) {
					if (["_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].includes(symbol) === false) {
						return("err")
					}
				}
				try {
					const subs = (await pool.query(`SELECT * FROM "subcategories".${subcategory} WHERE post_id = '${req.body.id}'`)).rows

					// const subs = (await pool.query(`SELECT * FROM "subcategories".$1 WHERE post_id = $2`, [subcategory, req.body.id])).rows

					let additional_fields = subs[0]
					if (additional_fields !== undefined) {
						answer.rows[0]['additional_fields'] = additional_fields
					}
				}
				catch (e) {
					console.error(`Внутренняя ошибка api getPost ${e}`)
				}
			}
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
