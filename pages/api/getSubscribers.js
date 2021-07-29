import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const userIdInt = Number(user_id)

            let sub = await prisma.$queryRaw(`SELECT subscribers FROM users WHERE id = ${userIdInt}`)
            if (sub[0].subscribers == null || sub[0].subscribers === '' || sub[0].subscribers === '[]'){

                res.json({"message":"nothing"})
            }
            const subscribers = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                }
            })
            let preList = subscribers['subscribers'].substring(1)
            let preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')
            let humans = []

            for (var index in list) {
                const human = await prisma.users.findFirst({
                    where: {
                        id: Number(list[index])

                    },
                    select: {
                        id: true,
                        name: true,
                        userPhoto: true,
                        raiting: true
                    }
                })
                if (human !== null) {
                    humans.push(human)
                }
            }
            res.json(humans)
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