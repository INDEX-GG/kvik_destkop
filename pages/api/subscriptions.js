import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const seller_id = req.body.seller_id
            const userIdInt = Number(user_id)
            const sellerIdInt = Number(seller_id)

            let sub = await prisma.$queryRaw(`SELECT subscriptions FROM users WHERE id = ${userIdInt}`)
            if (sub[0].subscriptions == null || sub[0].subscriptions === ''){
                const obj = {
                    where:
                        {
                            id:userIdInt
                        },
                    data: {
                        subscriptions: '[]'
                    }
                }
                await prisma.users.update(obj);
            }
            const subscriptions = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                },
                select:
                    {
                        subscriptions:true
                    }
            })

            var preList = subscriptions['subscriptions'].substring(1)
            var preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')
            if (list.includes(seller_id)){
                var index = list.indexOf(seller_id)
                if (index > -1) {
                    list.splice(index, 1)
                }
            } else {
                list.push(seller_id)
            }

            var index = list.indexOf('')
            if (index > -1) {
                list.splice(index, 1)
            }

            const obj = {
                where:
                    {
                        id:userIdInt
                    },
                data: {
                    subscriptions: '[' + list.join() + ']'
                }
            }
            await prisma.users.update(obj);
            res.json('success')
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