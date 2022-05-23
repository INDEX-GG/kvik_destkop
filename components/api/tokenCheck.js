const jwt = require("jsonwebtoken")
const {Pool} = require("pg");
let tokenCheck = async function(token) {
    if (!token) {
        throw "A token is required for authentication"
    }
    try {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    } catch (err) {
        throw "Invalid Token"
    }
    const tokenData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
    const tokenUser = tokenData.sub

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    let user = await pool.query(`SELECT * FROM "public"."users" WHERE "users"."id" = $1`, [tokenUser])
    pool.end()
    user = user.rows[0]

    if ((user == null) || (user.remember_token !== tokenData.remember_token)) {
        throw "Invalid Token Data"
    }

    return tokenUser
}
module.exports = tokenCheck
