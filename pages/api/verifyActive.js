import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            const id = req.body.id
            const verify = "'" + req.body.verify + "'"


            await prisma.$queryRaw(`UPDATE posts SET active = ${verify} WHERE ID IN (${id})`)
            res.json({ message: 'successfully update' })
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