import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const userIdInt = Number(user_id)

            let sub = await prisma.$queryRaw(`SELECT subscriptions FROM users WHERE id = ${userIdInt}`)
            if (sub[0].subscriptions == null || sub[0].subscriptions === '' || sub[0].subscriptions === '[]'){

                res.json({"message":"nothing"})
            }
            const subscriptions = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                }
            })
            let preList = subscriptions['subscriptions'].substring(1)
            let preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')

            let sellers = []

            for (var index in list) {
                const seller = await prisma.users.findFirst({
                    where: {
                        id: Number(list[index])

                    },
                    select: {
                        id: true,
                        name: true,
                        userPhoto: true,
                    }
                })
                if (seller !== null) {
                    const products = await prisma.posts.findMany({
                        where: {
                            user_id: Number(seller.id)
                        },
                        select: {
                            id: true,
                            title: true,
                            price: true,
                            photo: true
                        }
                    })
                    seller.poducts = products
                    sellers.push(seller)
                }
            }
            res.json(sellers)
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