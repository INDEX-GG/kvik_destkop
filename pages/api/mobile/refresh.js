import { sign } from "jsonwebtoken"
let refreshTokenCheck = require('components/api/refreshTokenCheck');
export default async function handler(req, res) {
    if (req.method === "POST") {

        const main = async () => {
            const refreshToken = req.body.RefreshAuthToken
            const userId = await refreshTokenCheck(refreshToken)
            const claims = {sub: userId}
            const new_jwt = sign(claims, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: 3600})
            return { authToken: new_jwt }
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api mobile/refresh ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(403).send("Invalid Token");
            }
            res.status(400).send("ошибка api mobile/refresh: " + error.toString())
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}