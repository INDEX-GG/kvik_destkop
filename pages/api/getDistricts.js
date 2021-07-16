import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            const id = req.body.id
            const idInt = Number(id)
            const districts = await prisma.districts.findMany({
                where: {
                    parent_id: idInt
                }
            })
            res.json(districts)
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