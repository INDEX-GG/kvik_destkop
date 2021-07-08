import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {


    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            let {name, parrent_id} = req.body
            const exist = await prisma.cities.findFirst({
                where: {
                    name: name
                }
            })
            if (exist === null) {
                res.status(200).json({message: 'the city does not exist'})
            } else if (parrent_id === "0") {
                res.status(200).json({message: 'this is country'})
            } else {
                const results1 = await prisma.$queryRaw(`SELECT * FROM "public"."cities" WHERE id = ${parrent_id};`)
                if (((results1[0]).parent_id) == 0) {
                    res.json({country : results1})
                } else {
                    const results2 = await prisma.$queryRaw(`SELECT * FROM "public"."cities" WHERE id = ${(results1[0]).parent_id};`)
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