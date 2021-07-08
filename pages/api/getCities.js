import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {

    if (req.method === 'POST') {

        const prisma = new PrismaClient();

        async function main() {

            async function getCities() {
                const results = await prisma.cities.findMany({
                    skip: req.body.of,
                    select: {
                        id: true,
                        name: true,
                        parent_id: true,
                    }
                })
                return results;
            }

            const results = await getCities();
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