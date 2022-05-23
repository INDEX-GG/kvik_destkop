import withSession from '../../lib/session'
const {Pool} = require("pg");
import { sign } from 'jsonwebtoken'
const globalSalt = process.env.GLOBAL_SALT
let toMD5 = require("components/api/MD5")
let decrypt = require("components/api/decrypt")


export default withSession(async (req, res) => {
	if (req.method === 'POST') {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });

		const main = async () => {
			const saltedPassword = globalSalt + decrypt(req.body.password) + globalSalt
			const hashedPassword = toMD5(saltedPassword)
			let user = await pool.query(`SELECT * FROM "public"."users" WHERE "users"."phone" = $1 AND "users"."password" = $2`, [decrypt(req.body.phone), hashedPassword])
			user = user.rows[0]
			if (user != null) {
				const claims = {sub: user.id, remember_token: user.remember_token}
				const jwt_refresh = sign(claims, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET, { expiresIn: '380d'})
				const session_data = {id: user.id, RefreshAuthToken: jwt_refresh, rememberToken: user.remember_token}
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
			res.json('ошибка api checkUser, ' + e.toString())
			res.status(405).end();
		}
		finally {
			pool.end()
		}

	} else {
		res.json({ message: 'method not allowed' })
		res.status(405).end()
	}
})