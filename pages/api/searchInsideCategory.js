import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            const categoryId = req.body.category_id
            const categoryIdInt = Number(categoryId)
            const text = req.body.text
            const lowerText = text.toLowerCase()

            if (categoryId == undefined || categoryId == '') {
                const results = await prisma.$queryRaw(`SELECT * FROM posts WHERE LOWER (title) LIKE '%${lowerText}%'`)
                res.json({results: results})

            } else {
                const results = await prisma.$queryRaw(`SELECT * FROM posts WHERE category_id = ${categoryIdInt} AND LOWER (title) LIKE '%${lowerText}%'`)
                res.json({ results : results });
            }


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
        res.end()
    }
}