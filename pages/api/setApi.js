import { PrismaClient } from '@prisma/client';
import CryptoJS from "crypto-js";
let toMD5 = require("components/api/MD5")
let decrypt = require("components/api/decrypt")
const globalSalt = process.env.GLOBAL_SALT

export default async function handler(req, res) {

	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const add = async () => {
			//Заносим в таблицу
			const saltedPassword = globalSalt + decrypt(req.body.password) + globalSalt
			const hashedPassword = toMD5(saltedPassword)
			var now = new Date()
			const obj = {
				data: {
					name: `${req.body.name}`,
					password: hashedPassword,
					phone: decrypt(req.body.phone),
					createdAt: now
				}
			}
			await prisma.users.create(obj);
		}

		const main = async () => {
			function decrypt(encrypt_text) {
				return CryptoJS.AES.decrypt(encrypt_text, process.env.NEXT_PUBLIC_MY_SECRET).toString(CryptoJS.enc.Utf8);
			}
			const result = await prisma.users.findUnique({
				where: {
					phone: decrypt(req.body.phone)
				},
			})
			if (result) {
				return { message: 'user already exists' };
			} else {
				add();
				const id = await prisma.users.findFirst({
					where: {
						phone: decrypt(req.body.phone)
					},
					select: {
						id: true
					}
				})
				return { message: 'user created', id: id.id }
			}
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (error) {
			console.error(`ошибка api setApi ${error}`)
			if (error === "A token is required for authentication") {
				return res.status(403).send("A token is required for authentication");
			}
			if (error === "Invalid Token") {
				return res.status(401).send("Invalid Token");
			}
			// res.status(400).send("ошибка api subscribe: " + error.toString())
			res.json('ошибка api setApi, ' + error.toString())
		}
		finally {
			await prisma.$disconnect();
		}

	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
}