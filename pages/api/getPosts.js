import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {

    if (req.method === 'POST') {

        const prisma = new PrismaClient();

        async function main() {
            //Этот запрос нужно будет связать с таблицей
            async function getPost() {
                const results = await prisma.posts.findMany({
                    skip: req.body.of,
                    take: 20,
                    select: {
                        id: true,
                        category_id: true,
                        price: true,
                        photo: true,
                        rating: true,
                        created_at: true,
                        delivery: true,
                        reviewed: true,
                        address: true,
                        phone: true,
                        trade: true,
                        verify_moderator: true,
                        commercial: true,
                        secure_transaction: true,
                        title: true,
                        email: true
                    }
                })
                return results;
            }

            const results = await getPost();
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