import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const subscriber_id = req.body.subscriber_id
            const userIdInt = Number(user_id)
            const sellerIdInt = Number(subscriber_id)

            let sub = await prisma.$queryRaw(`SELECT subscribers FROM users WHERE id = ${userIdInt}`)
            if (sub[0].subscribers == null || sub[0].subscriptions === ''){
                const obj = {
                    where:
                        {
                            id:userIdInt
                        },
                    data: {
                        subscribers: '[]'
                    }
                }
                await prisma.users.update(obj);
            }
            const subscribers = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                },
                select:
                    {
                        subscribers:true
                    }
            })
            let answer = 'none'
            let preList = subscribers['subscribers'].substring(1)
            let preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')
            if (list.includes(subscriber_id)){
                var index = list.indexOf(subscriber_id)
                if (index > -1) {
                    list.splice(index, 1)
                    answer = 'delete'
                }
            } else {
                list.push(subscriber_id)
                answer = 'post'
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
                    subscribers: '[' + list.join() + ']'
                }
            }
            await prisma.users.update(obj);
            res.json(answer)
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