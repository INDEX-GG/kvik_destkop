import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();

        const main = async () => {
            const category = req.body.category.toLowerCase();
            const text = req.body.text.toLowerCase();
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            const price_min = req.body.price.min
            const price_max = req.body.price.max
            const check = req.body.check
            console.log(check);
            console.log('-- -- --')
            let constructQuery = ''
            for (const [key, value] of Object.entries(check)) {
                console.log(`${key}: ${value}`);
                if (typeof value === 'object') {
                    console.log("it`s Object!")
                    constructQuery.concat()
                } else {
                    console.log("it`s String!")
                    constructQuery =  constructQuery.concat(" AND LOWER (", category, ".", key, ") = '", value.toLowerCase(), "'")
                }
            }
            console.log('--- --- ---')
            console.log(constructQuery);


            return await prisma.$queryRaw(`SELECT posts.archived,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts","${category}" WHERE (posts.id = ${category}.post_id) AND posts.active = 0 AND posts.verify = 0 AND posts.price >= ${price_min} AND posts.price <= ${price_max} ${constructQuery} AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') ORDER BY id desc LIMIT ${page_limit} offset ${page}`)


        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api postCategorySearch${e}`)
            res.json('ошибка api postCategorySearch', e)
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