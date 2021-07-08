import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            let {name, parent_id} = req.body
            const exist = await prisma.cities.findFirst({
                where: {
                    name: name
                }
            })
            if (exist === null) {
                res.status(200).json({message: 'the city does not exist'})
            } else if (parent_id === "0") {
                res.status(200).json({message: 'this is country'})
            } else {
                const parentNum = parseInt(parent_id)
                const results1 = await prisma.cities.findFirst({
                    where: {
                        id: parentNum
                    }
                })
                if (((results1).parent_id) == 0) {
                    res.json({country : results1})
                } else {
                    const parentNum2 = parseInt(results1.parent_id)
                    const results2 = await prisma.cities.findFirst({
                        where: {
                            id: parentNum2
                        }
                    })
                    console.log(parentNum2)
                    console.log(results1, results2)
                    res.json({country : results2, region : results1})
                }
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
    }
}