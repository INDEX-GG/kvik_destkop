import { sign } from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'GET') {

        const main = async () => {

            const jwt = require("jsonwebtoken");
            const user = req.session.get('user')
            const token = user.RefreshAuthToken

            // const token = req.headers["x-access-token"];
            if (!token) {
                return res.status(403).send("A token is required for authentication");
            }
            try {
                jwt.verify(token, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET);
            } catch (err) {
                return res.status(401).send("Invalid Token");
            }
            const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET).sub
            console.log(tokenUser);
            const claims = {sub: tokenUser}
            const new_jwt = sign(claims, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: 120})
            return { authToken: new_jwt }

        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api refresh${e}`)
            res.json('ошибка api refresh', e)
            res.status(405).end();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}