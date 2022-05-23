import withSession from '../../lib/session'
const {Pool} = require("pg");

export default withSession(async (req, res) => {
	try {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });
		const sessionUser = req.session.get('user')
		const sessionRememberToken = sessionUser.rememberToken
		let response = await pool.query(`SELECT * FROM "public"."users" WHERE "users"."id" = $1`, [sessionUser.id])
		pool.end()
		let DbUser = response.rows[0]
		const DbUserRememberToken = DbUser.remember_token
		const DbUserId = DbUser.id
		const dbUser = {"id": DbUserId, "rememberToken": DbUserRememberToken}
		if ((sessionUser.id !== dbUser.id) || (sessionRememberToken !== dbUser.rememberToken)) {
			throw "wrong session data"
		}
		if (! sessionUser) {
			throw "no user in session"
		}
		res.json({id: sessionUser.id})
	} catch (err) {
		console.log("Ошибка api user: " + err.toString());
		req.session.destroy()
		res.json({message: 'empty'})
	}
})