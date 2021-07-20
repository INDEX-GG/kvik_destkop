import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const userIdInt = Number(user_id)

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

            var preList = favorites['favorites'].substring(1)
            var preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')

            let posts = []

            for (let index in list) {
                let post = []
                const postData = await prisma.posts.findFirst({
                    where: {
                        id: Number(list[index])
                    }
                })
                const userData = await prisma.users.findFirst({
                    where: {
                        id: Number(postData.user_id)
                    }
                })
                post.push(postData)
                post.push(userData)
                posts.push(post)
            }

            res.json(posts)
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