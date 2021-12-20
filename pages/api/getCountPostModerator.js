import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const page_limit = req.body.page_limit
            const last_post_id = req.body.last_post_id
            let answer = await prisma.$queryRaw(`SELECT * FROM "posts" WHERE active = 0 AND verify = 0 AND id > ${last_post_id} ORDER BY id LIMIT ${page_limit}`)


            return answer
        }
        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getCountPostsModerator ${e}`)
            res.json('ошибка api getCountPostsModerator, ', e)
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