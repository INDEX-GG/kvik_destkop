import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const jwt = require("jsonwebtoken");
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        const tokenUser = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET).sub
        if (parseInt(req.body.user_id, 10) !== tokenUser) {
            return res.status(403).send("Invalid Token");
        }

        const prisma = new PrismaClient();
        const main = async () => {

            let message = 'error'
            const user_id = req.body.user_id
            const block_user_id = req.body.block_user_id
            const time = req.body.time
            const block = req.body.block
            if (block !== true) {
                if (block !== false) {
                    return {message: message}
                }
            }
            const blockedUsers = await prisma.users.findFirst({
                where: {
                    id: user_id
                },
                select:
                    {
                        blocked_user: true
                    }
            })
            let list = JSON.parse(blockedUsers['blocked_user'])
            if (block === true) {
                if (list.some(item => item.user_id === block_user_id)) {
                    message = 'already block'
                } else {
                    list.push({ user_id: block_user_id, time: time})
                    message = 'successfully block'
                }
            } else {
                if (list.some(item => item.user_id === block_user_id)) {
                    for (let index in list) {
                        if (list[index].user_id === block_user_id) {
                            list.splice(index, 1)
                            message = 'successfully unblock'
                        }
                    }
                } else {
                    message = 'dont block'
                }
            }
            const obj = {
                where:
                    {
                        id: user_id
                    },
                data: {
                    blocked_user: JSON.stringify(list)
                }
            }
            await prisma.users.update(obj);
            return {message: message};
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api blockUser${e}`)
            res.json('ошибка api blockUser', e)
            res.status(405).end();
        }
        finally {
            await prisma.$disconnect();
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}