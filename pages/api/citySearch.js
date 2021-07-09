import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            let {name, parent_id} = req.body
            if (parent_id == "0") {
                res.status(200).json({message: 'this is country'})
            } else {

                // Добавить обработку регистров
                const cities = await prisma.$queryRaw(`SELECT name, parent_id FROM cities WHERE name LIKE '${name}%'`)     // LIMIT 5

                // const RES = []
                //
                // for (let value of cities) {
                //
                //
                //
                //     const parentNum = parseInt(value.parent_id)
                //     const results1 = await prisma.cities.findFirst({
                //         where: {
                //             id: parentNum
                //         }
                //     })
                //     if (((results1).parent_id) == 0) {
                //         res.json({country : results1})
                //     } else {
                //         const parentNum2 = parseInt(results1.parent_id)
                //         const results2 = await prisma.cities.findFirst({
                //             where: {
                //                 id: parentNum2
                //             }
                //         })
                //
                //         RES.push([{country : results2, region : results1, city : value }])
                //         //res.json({country : results2, region : results1, city : value })
                //     }
                //
                //
                //
                //
                //
                // }
                //     console.log(RES)
                    res.json(cities)

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