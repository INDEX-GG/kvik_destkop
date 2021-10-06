import {PrismaClient} from '@prisma/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const page_limit = req.body.page_limit
            const last_post_id = req.body.last_post_id
            if (last_post_id === 0) {
                const count = await prisma.$queryRaw(`SELECT COUNT(*) FROM "users" JOIN "posts" on posts.user_id = users.id WHERE posts.active = 0 AND posts.verify = 2`)
                const answer = await prisma.$queryRaw(`SELECT posts.id, posts.title, posts.description, posts.price, posts.category_id, posts.photo, posts.user_id, users.name, users."userPhoto" FROM "users" JOIN "posts" on posts.user_id = users.id WHERE posts.active = 0 AND posts.verify = 2 AND posts.id > ${last_post_id} ORDER BY posts.id LIMIT ${page_limit}`)
                return {posts: answer, count: count}
            }
            const answer =  await prisma.$queryRaw(`SELECT posts.id, posts.title, posts.description, posts.price, posts.category_id, posts.photo, posts.user_id, users.name, users."userPhoto" FROM "users" JOIN "posts" on posts.user_id = users.id WHERE posts.active = 0 AND posts.verify = 2 AND posts.id > ${last_post_id} ORDER BY posts.id LIMIT ${page_limit}`)
            return {posts: answer}
        }
        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getPostsModerator${e}`)
            res.json('ошибка api getPostsModerator', e)
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