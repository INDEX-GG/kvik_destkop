import { sign } from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const main = async () => {
            const jwt = require("jsonwebtoken");
            const token = req.body.RefreshAuthToken
            if (!token) {
                throw 403;
            }
            try {
                jwt.verify(token, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET);
            } catch (err) {
                throw 403;
            }
            const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET).sub
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
            console.error(`ошибка api refresh ${e}`)
            if (parseInt(e) === 403) { res.status(403) }
            else { res.status(400).json({ message: 'ошибка api getPost'}) }
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}