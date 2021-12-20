import {Pool} from "pg";
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });
		const main = async () => {
			const subcategory = req.body.subcategory;
			if (subcategory != null && subcategory !== '') {
				const subs = (await pool.query(`SELECT * FROM ${subcategory} WHERE post_id = '${req.body.post_id}'`)).rows
				let dict = subs[0]
				dict.subcategory = subcategory
				// for (var key in dict){
				// 	if (dict[key] === false) {
				// 		delete dict[key]
				// 	}
				// }
				return dict;
			} else {
				return { message: 'error' };
			}
		}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api subcategoryFields ${e}`)
			res.json('ошибка api subcategoryFields, ', e)
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