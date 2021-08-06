import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {


    if (req.method === 'POST') {

        const prisma = new PrismaClient();

        async function main() {
            //Этот запрос нужно будет связать с таблицей
        
            async function getPost(ids) {
                console.log(ids)
                const results = await prisma.$queryRaw(`SELECT posts.archived,users."userPhoto",posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts","users" WHERE (user_id = ${ids}) AND (users.id = user_id)` )


                return results;
            }

            const results = await getPost(+req.body.user_id);
            console.log(req.body.user_id)
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