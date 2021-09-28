import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            const user_id = (req.body.user_id).toString()
            let answer = await prisma.$queryRaw(`SELECT id, user_id, category_id, price, old_price, photo, rating, created_at, delivery, reviewed, address, phone, trade, verify_moderator, commercial, secure_transaction, title, email, viewing FROM "posts" WHERE active = 0 ORDER BY id desc LIMIT ${page_limit} offset ${page}`)
            for (let index in answer) {
                let views = (answer[index]).viewing
                let preList = views.substring(1);
                let preList2 = preList.substring(0, preList.length - 1);
                let list = preList2.split(',');
                if (list.includes(user_id)) {
                    (answer[index]).viewing_bool = true
                } else {
                    (answer[index]).viewing_bool = false
                }
            }
            return answer
        }
        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getPostsPortion${e}`)
            res.json('ошибка api getPostsPortion', e)
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