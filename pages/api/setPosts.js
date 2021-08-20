import multer from "multer"
import { PrismaClient } from '@prisma/client';

let names = [];
export const config = {
	api: {
		bodyParser: false,
	},
}

var storage = multer.diskStorage({
	destination: function (cb) {
		cb(null, "./public/offersImage")
	},
	filename: function (req, cb) {
		req.name = ~~(Math.random() * 999999) + "offer-" + ~~(Math.random() * 999999) + ".webp";

		cb(null, req.name)

		return names = [...names, "/offersImage/" + req.name];

	},
})

var upload = multer({ storage: storage })

const text2Bool = (string) => {
	if (string === 'true') {
		return true
	} else {
		return false
	}
}

export default function handler(req, res) {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();
		upload.array("image", 20)(req, {}, () => {

			const main = async () => {

				const communication = {
					phone: text2Bool(req.body.byphone),
					message: text2Bool(req.body.bymessage)
				}

				const alias = (req.body.alias).toString()

				var now = new Date()

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
						secure_transaction: text2Bool(req.body.safedeal),
						slug: "slug",
						communication: JSON.stringify(communication),
						address: req.body.address,
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
						verify: 1,
						verify_moderator: { "verify": ['1'] },
						subcategory: req.body.subcategory
					}
				}
				const allUsers = await prisma.posts.create(obj);
				return { id: allUsers.id };
			}

			main(req.name)
				.then(r => res.json(r))
				.catch(e => console.error(`ошибка api setPosts${e}`))
				.finally(async () => {
					await prisma.$disconnect()
				})
		})
	} else {
		return res.status(405).json({ message: 'method not allowed' })
	}
}