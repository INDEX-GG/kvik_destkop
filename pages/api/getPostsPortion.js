import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const prisma = new PrismaClient();
        const main = async () => {
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit

            return  await  prisma.$queryRaw(`SELECT id, user_id, category_id, price, old_price, photo, rating, created_at, delivery, reviewed, address, phone, trade, verify_moderator, commercial, secure_transaction, title, email FROM "posts" WHERE active = 0 ORDER BY id desc LIMIT ${page_limit} offset ${page}`)
        }

        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getPosts${e}`)
            res.json('ошибка api getPosts', e)
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