import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const userIdInt = Number(user_id)

            let fav = await prisma.$queryRaw(`SELECT favorites FROM users WHERE id = ${userIdInt}`)
            let list = JSON.parse(fav[0].favorites)

            if (fav[0].favorites == null || fav[0].favorites === '' || fav[0].favorites === '[]'){
                res.json({"message":"nothing"})
            }

            let posts = []

            for (let index in list) {
                let postData = await prisma.posts.findFirst({
                where: {
                    id: Number(list[index].post_id)
                }
            })
                if (postData !== null) {

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
                     if (userData !== null) {
                         postData.user_name = userData.name
                         postData.user_photo = userData.userPhoto
                         postData.comment = list[index].comment
                         postData.condition = list[index].condition
                         posts.push(postData)
                     }
                }
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