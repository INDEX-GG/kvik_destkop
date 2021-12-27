import { PrismaClient } from '@prisma/client';
import {Pool} from "pg";

const text2Bool = (string) => {
	return (string === 'true') || (string === true);
}
export default async function handler(req, res) {
	if (req.method === 'POST') {

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

		const pool = new Pool({ connectionString: process.env.DATABASE_URL});
		const prisma = new PrismaClient();
			const main = async () => {
				const communication = {
					phone: text2Bool(req.body.byphone),
					message: text2Bool(req.body.bymessages)
				}
				const alias = (req.body.alias).toString()
				let now = new Date()
				const obj = {
					data: {
						country_code: 7,
						user_id: +req.body.user_id,
						category_id: alias,
						title: req.body.title,
						description: req.body.description,
						price: req.body.price,
						trade: text2Bool(req.body.trade),
						delivery: text2Bool(req.body.delivery),
						secure_transaction: text2Bool(req.body.save_deal),
						slug: "slug",
						communication: JSON.stringify(communication),
						address: req.body.location,
						phone_hidden: false,
						lon: 1234.00,
						lat: 1234.00,
						visits: 0,
						commercial: 0,
						date_start_commercial: now,
						date_stop_commercial: now,
						add_fields: { "fields": "none" },
						archived_time: now,
						created_at: now,
						updated_at: now,
						deleted_at: now,
						date_verify: now,
						verify: 0,
						// verify: 1,
						subcategory: req.body.subcategory,
						verify_moderator: { "verify": [] },
						coordinates: req.body.coordinates,
						city: req.body.city
											}
				}
				const createPost = await prisma.posts.create(obj);
				if (req.body.additional_fields !== null && req.body.additional_fields !== undefined) {
					try {
						const additional_fields = req.body.additional_fields
						let columns = ''
						let values = ''
						columns += '"' + 'post_id' + '", '
						values += "'" + createPost.id + "', "
						additional_fields.forEach((element) => {
							if (element.value !== '') {
								columns += '"' + element.alias + '", '
								values += "'" + element.value + "', "
							}
						})
						columns = columns.slice(0, -2)
						values = values.slice(0 ,-2)
						await pool.query(`INSERT INTO "subcategories".${req.body.subcategory} (${columns}) VALUES (${values})`)
					}
					catch (e) {
						console.error(`Внутренняя ошибка api setPosts ${e}`)
					}
				}
				return { id: createPost.id };
			}
		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api setPosts ${e}`)
			res.json('ошибка api setPosts, ', e)
			res.status(405).end();
		}
		finally {
			await prisma.$disconnect();
			await pool.end();
		}
	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}
