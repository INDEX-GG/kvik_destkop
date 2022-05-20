import { PrismaClient } from '@prisma/client';
import tokenCheck from "components/api/tokenCheck";

const text2Bool = (string) => {
	return (string === 'true') || (string === true);
}
export default async function handler(req, res) {
	if (req.method === 'POST') {

		const prisma = new PrismaClient();
			const main = async () => {
				const userId = tokenCheck(req.headers["x-access-token"])
				const communication = {
					phone: text2Bool(req.body.byphone),
					message: text2Bool(req.body.bymessages)
				}
				const alias = (req.body.alias).toString()
				let now = new Date()
				let day_in_ms = 1000*60*60*24
				let active_time = new Date(Math.floor(now) + day_in_ms*30)

				let manager_name
				let manager_phone
				let crm_id
				if (req.body.manager_name === undefined) {manager_name = null} else {manager_name = req.body.manager_name}
				if (req.body.manager_phone === undefined) {manager_phone = null} else {manager_phone = req.body.manager_phone}
				if (req.body.crm_id === undefined) {crm_id = null} else {crm_id = req.body.crm_id}

				const obj = {
					data: {
						country_code: 7,
						user_id: +userId,
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
						rotation_date: now,
						// updated_at: now,
						// archived_time: now,
						// deleted_at: now,
						// date_start_commercial: now,
						// date_stop_commercial: now,

						verify: 0,
						// verify: 1,
						subcategory: req.body.subcategory,
						verify_moderator: { "verify": [] },
						coordinates: req.body.coordinates,
						city: req.body.city,
						manager_name: manager_name,
						manager_phone: manager_phone,
						crm_id: crm_id
					}
				}
				const createPost = await prisma.posts.create(obj);
				if (req.body.additional_fields !== null && req.body.additional_fields !== undefined) {
					if (req.body.additional_fields.length !== 0) {
						try {
							let column_info = await prisma.$queryRaw(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'subcategories' AND TABLE_NAME = '${req.body.subcategory}' ORDER BY ORDINAL_POSITION`)
							let exist_columns = (column_info.map(Object.values)).flat()
							const additional_fields = req.body.additional_fields
							let columns = ''
							let values = ''
							columns += '"' + 'post_id' + '", '
							values += "'" + createPost.id + "', "
							additional_fields.forEach((element) => {
								if (element.value !== '' && exist_columns.includes(element.alias)) {
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
								let custom_e = "Error: " + e + ", Fields: " + JSON.stringify(req.body.additional_fields)
								const error = "'[" + custom_e.toString().replace(/"/g, '""').replace(/'/g, "''") + "]'"
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
		catch (error) {
			console.error(`ошибка api setPosts ${error}`)
			if (error === "A token is required for authentication") {
				return res.status(403).send("A token is required for authentication");
			}
			if (error === "Invalid Token") {
				return res.status(401).send("Invalid Token");
			}
			// res.status(400).send("ошибка api subscribe: " + error.toString())
			res.json('ошибка api setPosts, ', error)
		}
		finally {
			await prisma.$disconnect();
		}
	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}
