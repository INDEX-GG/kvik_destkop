import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const user_id = req.body.user_id
            let blocked_users = await prisma.users.findFirst({
                where: {
                    id: user_id
                },
                select:
                    {
                        blocked_user: true
                    }
            })
            if (blocked_users['blocked_user'] == null || blocked_users['blocked_user'] === '' || blocked_users['blocked_user'] === '[]') {
                return { "message": "nothing" }
            }
            const list = JSON.parse(blocked_users['blocked_user'])
            let userList = []
            for (let index in list) {
                userList.push((list[index]).user_id)
            }
            let users = await prisma.$queryRaw(`SELECT * FROM users WHERE id IN (${userList})`)
            console.log(users);
            let answer = []
            for (let index2 in users) {
                let postData = {}
                postData.id = users[index2].id
                postData.name = users[index2].name
                postData.userPhoto = users[index2].userPhoto
                for (let index3 in list) {
                    if ((list[index3]).user_id === users[index2].id) {
                        postData.blocked_time = (list[index3]).time
                    }
                }
                answer.push(postData)
            }
            return { blocked_users: answer }
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getBlockUsers${e}`)
            res.json('ошибка api getBlockUsers', e)
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