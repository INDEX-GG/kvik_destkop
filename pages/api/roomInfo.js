import {PrismaClient} from '@prisma/client';
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
        const prisma = new PrismaClient();
        const main = async () => {
            let list = req.body
            let users = []
            let products = []
            for (const val of list) {
                if (parseInt(val.customer_id, 10) !== tokenUser && parseInt(val.seller_id, 10) !== tokenUser) {
                    return res.status(403).send("Invalid Token");
                }
                if (!(users.includes(val.seller_id))) {
                    users.push(val.seller_id)
                }
                if (!(users.includes(val.customer_id))) {
                    users.push(val.customer_id)
                }
            }
            // for (const val of list) {
            //     if (!(users.includes(val.customer_id))) {
            //         users.push(val.customer_id)
            //     }
            // }
            for (const val of list) {
                if (!(products.includes(val.product_id))) {
                    products.push(val.product_id)
                }
            }
            const q_users =  await prisma.$queryRaw(`SELECT users.id as user_id, users.name, users."userPhoto" FROM "users" WHERE ID IN (${users})`)
            const q_products = await prisma.$queryRaw(`SELECT posts.id as post_id, posts.title, posts.photo, posts.price FROM "posts" WHERE ID IN (${products})`)
            const products_and_users = q_products.concat(q_users);
            for (const val of list) {
                for (const arg of products_and_users) {
                    if (arg.user_id === val.customer_id) {
                        val.customer_name = arg.name
                        val.customer_photo = arg.userPhoto
                    }
                    if (arg.user_id === val.seller_id) {
                        val.seller_name = arg.name
                        val.seller_photo = arg.userPhoto
                    }
                    if (arg.post_id === val.product_id) {
                        val.product_name = arg.title
                        val.product_photo = arg.photo
                        val.product_price = arg.price
                    }
                }
            }
            return {list}
        }
        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api roomInfo ${e}`)
            res.json('ошибка api roomInfo, ', e)
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