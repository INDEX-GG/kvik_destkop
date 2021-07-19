import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const post_id = req.body.post_id
            const userIdInt = Number(user_id)
            const postIdInt = Number(post_id)

            let fav = await prisma.$queryRaw(`SELECT favorites FROM users WHERE id = ${userIdInt}`)
            if (fav[0].favorites == null || fav[0].favorites === ''){
                const obj = {
                    where:
                        {
                            id:userIdInt
                        },
                    data: {
                        favorites: '[]'
                    }
                }
                await prisma.users.update(obj);
            }
            const favorites = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                },
                select:
                    {
                        favorites:true
                    }
            })

            var preList = favorites['favorites'].substring(1)
            var preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')
            if (list.includes(post_id)){
                var index = list.indexOf(post_id)
                if (index > -1) {
                    list.splice(index, 1)
                }
            } else {
                list.push(post_id)
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
                    favorites: '[' + list.join() + ']'
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