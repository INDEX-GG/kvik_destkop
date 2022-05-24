import tokenCheck from "#components/api/tokenCheck";
import { sign } from 'jsonwebtoken'
const {Pool} = require("pg");
let uuid = require("uuid");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });

        const main = async () => {
            const userId = await tokenCheck(req.headers["x-access-token"])
            const random = uuid.v4();
            await pool.query(`UPDATE "public"."users" SET "remember_token" = $1 WHERE "users"."id" = $2`, [random, userId])
            const claims = {sub: userId, remember_token: random}
            const jwt_refresh = sign(claims, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET, { expiresIn: '380d'})
            const session_data = {id: userId, RefreshAuthToken: jwt_refresh, rememberToken: random}
            try {
                req.session.set('user', session_data)
                await req.session.save()
            } catch (e) {
                // Ignore malformed lines.
                }
            return { "jwt_refresh": jwt_refresh }
            // return {message: "success"}
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api mobile/checkUser ${error}`)
            if (parseInt(error) === 403) { res.status(403).json({isset: false}) }
            res.status(400).json({ message: "ошибка api mobile/checkUser: " + error.toString()})
        }
        finally {
            pool.end()
        }

    } else {
        res.json({message: "method not allowed"})
        res.status(405).end()
    }
}
