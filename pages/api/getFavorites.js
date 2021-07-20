import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const userIdInt = Number(user_id)

            const favorites = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                }
            })

            var preList = favorites['favorites'].substring(1)
            var preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')
            console.log(list);

            var posts = []

            for (var index in list) {
                const post = await prisma.posts.findMany({
                    where: {
                        id: Number(list[index])
                    }
                })
                posts.push(post[0])
            }

            console.log(posts);






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