import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const post_id = req.body.post_id
            const user_id = (req.body.user_id).toString()
            let views = await prisma.posts.findFirst({
                where: {
                    id: post_id
                },
                select:
                    {
                        viewing: true
                    }
            })
            let preList = views['viewing'].substring(1);
            let preList2 = preList.substring(0, preList.length - 1);
            let list = preList2.split(',');
            if (list.includes(user_id)) {
                return {viewing: '[' + list.join() + ']'}
            } else {
                list.push(user_id)
            }
            var index_1 = list.indexOf('')
            if (index_1 > -1) {
                list.splice(index_1, 1)
            }
            const obj = {
                where:
                    {
                        id: post_id
                    },
                data: {
                    viewing: '[' + list.join() + ']'
                }
            }
            await prisma.posts.update(obj);
            return {viewing: '[' + list.join() + ']'}
        }
        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api post_viewing${e}`)
            res.json('ошибка api post_viewing', e)
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