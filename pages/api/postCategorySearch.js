import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            let data = req.body.data

            const posts = await prisma.$queryRaw(`SELECT * FROM posts WHERE category_id LIKE '${data}%' LIMIT 15`)     // LIMIT?
            res.json(posts)
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