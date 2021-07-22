import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const userIdInt = Number(req.body.user_id)


            console.log('data',req.body)

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
                }
            })

            let posts = []

            let preList = favorites['favorites'].substring(1)
            let preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')
            for (let index in list) {
                let secondLevel = (list[index]).split(':')
                let postData = await prisma.posts.findFirst({
                            where: {
                                id: Number(secondLevel[0])
                            }
                        })
                const userData = await prisma.users.findFirst({
                            where: {
                                id: Number(postData.user_id)
                            },
                            select: {
                                id: true,
                                name: true,
                                userPhoto: true,
                            }
                        })
                postData.user_name = userData.name
                postData.user_photo = userData.userPhoto
                postData.comment = secondLevel[1]

                posts.push(postData)
            }
            
           return res.json({ posts: posts });

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