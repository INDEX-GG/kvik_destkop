import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const jwt = require("jsonwebtoken");
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).send("A token is required for authentication");
		}
		try {
			jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
		} catch (err) {
			return res.status(401).send("Invalid Token");
		}
		const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
		if (parseInt(req.body.user_id, 10) !== tokenUser) {
			return res.status(403).send("Invalid Token");
		}
		const check  = await prisma.$queryRaw(`SELECT * FROM "posts" WHERE id = ${req.body.post_id} AND posts.user_id = ${req.body.user_id}`)
		if (check.length === 0) {
			return res.status(403).send("Invalid User");
		}

		const main = async () => {
			const data = req.body
			const array = data["fields"]
			let columns = ''
			let values = ''
			let sub_post_id = 0
			array.forEach((element) => {
				if (element.fields !== '') {
					columns += '"' + element.alias + '", '
					values += "'" + element.fields + "', "
					if (element.alias === 'post_id') {
						sub_post_id = element.fields
					}
				}
			})

			if (parseInt(sub_post_id) !== parseInt(req.body.post_id)) {
				return res.status(403).send("Invalid Post data");
			}
			columns = columns.slice(0, -2)
			values = values.slice(0 ,-2)

			const check_exist  = await prisma.$queryRaw(`SELECT * FROM ${req.body.subcategory} WHERE post_id = ${req.body.post_id}`)
			if (check_exist.length !== 0) {
				return res.status(403).send("Already exist");
			}

			await prisma.$queryRaw(`INSERT INTO ${req.body.subcategory} (${columns}) VALUES (${values})`)
			return{ message: 'successfully update' };
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api subcategory ${e}`)
			res.json('ошибка api subcategory, ', e)
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