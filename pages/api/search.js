import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {


    if (req.method === 'POST') {

        const prisma = new PrismaClient();

        async function main() {
            //Этот запрос нужно будет связать с таблицей

            async function getPost(ids) {

                const results = await prisma.$queryRaw(`WITH ser AS (SELECT id,category_id,price,photo,rating,created_at,delivery,reviewed,address,phone,trade,verify_moderator,commercial,secure_transaction,title,email,title,description FROM "public"."posts" WHERE (title ~* '${ids}') OR (description ~* '${ids}') ) SELECT categories.name,categories.alias,posts.user_id,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email FROM "ser","categories","posts" WHERE ser.category_id = categories.id AND ser.id = posts.id`)
                return results;
            }
            console.log("data",req.body)
            const results = await getPost(req.body.product_name);
            console.log(results)
            res.json({ result: results });

        }

        main()
            .catch((e) => {
                console.log("error: " + e);
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
            })
    }
    else {

        res.status(405).json({ message: 'method not allowed' })

    }




}