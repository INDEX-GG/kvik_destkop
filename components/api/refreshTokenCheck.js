const jwt = require("jsonwebtoken")
const {Pool} = require("pg");
let refreshTokenCheck = async function(refreshToken) {
    if (!refreshToken) {
        throw "A token is required for authentication"
    }
    try {
        jwt.verify(refreshToken, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET);
    } catch (err) {
        throw "Invalid Token"
    }
    const tokenUser = jwt.verify(refreshToken, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET).sub
    async function getUser() {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        let response = await pool.query(`SELECT * FROM "public"."users" WHERE "users"."id" = $1`, [tokenUser])
        pool.end()
        let name = response.rows[0].name
        return name
    }
    const dbUser = await getUser()
    console.log(dbUser);
    return tokenUser
}
module.exports = refreshTokenCheck
