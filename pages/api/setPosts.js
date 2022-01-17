import { PrismaClient } from '@prisma/client';

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

		const prisma = new PrismaClient();
			const main = async () => {
				const communication = {
					phone: text2Bool(req.body.byphone),
					message: text2Bool(req.body.bymessages)
				}
				const alias = (req.body.alias).toString()
				let now = new Date()
				let day_in_ms = 1000*60*60*24
				let active_time = new Date(Math.floor(now) + day_in_ms*30)


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
						add_fields: { "fields": "none" },

						created_at: now,
						active_time: active_time,
						date_verify: now,
						updated_at: now,
						// archived_time: now,
						// deleted_at: now,
						// date_start_commercial: now,
						// date_stop_commercial: now,

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
					if (req.body.additional_fields.length !== 0) {
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

							await prisma.$queryRaw(`INSERT INTO "subcategories".${req.body.subcategory} (${columns}) VALUES (${values})`)

						}
						catch (e) {
							try{
								const error = "'[" + e.toString().replace(/"/g, '""').replace(/'/g, "''") + "]'"
								await prisma.$queryRaw(`UPDATE "posts" SET "additional_fields_error" = ${error} WHERE id = ${createPost.id}`)
							}
							catch (e) {`Внутренняя ошибка api setPosts ${e}`}
							console.error(`Внутренняя ошибка api setPosts ${e}`)
						}
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
		}
	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}
