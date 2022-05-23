import withSession from '../../lib/session'
import { sign } from 'jsonwebtoken'
import refreshTokenCheck from "components/api/refreshTokenCheck";
export default withSession(async (req, res) => {
    if (req.method === 'GET') {
        const main = async () => {
            const user = req.session.get('user')
            const token = user.RefreshAuthToken
            const UserId = await refreshTokenCheck(token)
            const claims = {sub: UserId, remember_token: user.rememberToken}
            console.log(user);
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
            console.error(`ошибка api refresh ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api refresh, ' + error.toString())
            res.status(400).json({ message: "ошибка api refresh, " + error.toString()})
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
})