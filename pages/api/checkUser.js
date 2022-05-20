import withSession from '../../lib/session'
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken'
const globalSalt = process.env.GLOBAL_SALT
let toMD5 = require("components/api/MD5")
let decrypt = require("components/api/decrypt")
export default withSession(async (req, res) => {
	if (req.method === 'POST') {
		const prisma = new PrismaClient();

		const main = async () => {
			const saltedPassword = globalSalt + decrypt(req.body.password) + globalSalt
			const hashedPassword = toMD5(saltedPassword)
			const user = await prisma.users.findUnique({
				where: {
					login: {
						phone: decrypt(req.body.phone),
						password: hashedPassword
					}
				}
			})
			if (user != null) {
				const claims = {sub: user.id}
				const jwt_refresh = sign(claims, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET, { expiresIn: '380d'})
				const session_data = {id: user.id, RefreshAuthToken: jwt_refresh}
				req.session.set('user', session_data)
				await req.session.save()
				return { idUser: user.id}
			} else {
				return ({ isset: false })
			}
		}

		try {
			let response = await main();
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response))
		}
		catch (e) {
			console.error(`ошибка api checkUser ${e}`)
			res.json('ошибка api checkUser, ', e)
			res.status(405).end();
		}
		finally {
			await prisma.$disconnect();
		}

	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
})