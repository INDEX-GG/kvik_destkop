import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
    const prisma = new PrismaClient();
    async function main() {
        //Этот запрос нужно будет связать с таблицей      
        async function getPost() {
            const results = await prisma.posts.findMany({
                where:
                {
                    id: +req.body.product_id
                },
                select: {
                    id: true,
                    category_id: true,
                    user_id: true,
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
                    email: true,
                    description: true
                }
            })
            return results;
        }
        const results = await getPost()
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