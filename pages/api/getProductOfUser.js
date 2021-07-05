import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {


    if (req.method === 'POST') {

        const prisma = new PrismaClient();

        async function main() {
            //Этот запрос нужно будет связать с таблицей
        
            async function getPost(ids) {
                
                const results = await prisma.$queryRaw(`SELECT posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify_moderator,posts.title,posts.email FROM "posts" WHERE user_id = ${ids}`)

            
                return results;
            }

            const results = await getPost(+req.body.product_id);
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