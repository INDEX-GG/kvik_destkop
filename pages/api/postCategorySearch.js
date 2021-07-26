import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const data = req.body.data
            const lowerData = data.toLowerCase()
            const posts = await prisma.$queryRaw(`SELECT * FROM posts WHERE LOWER (category_id) LIKE '${lowerData}%' LIMIT 15`)     // LIMIT?
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