import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            let message = 'error'
            const user_id = req.body.user_id
            const post_id = req.body.post_id
            const userIdInt = Number(user_id)
            let comment = req.body.comment
            const condition = req.body.condition
            if (req.body.comment === null || req.body.comment === undefined || req.body.comment === "undefined") {
                comment = ''
            }

            // Проверка и заполнение пустого поля
            let fav = await prisma.$queryRaw(`SELECT favorites FROM users WHERE id = ${userIdInt}`)
            if (fav[0].favorites == null || fav[0].favorites === '') {
                const obj = {
                    where:
                        {
                            id: userIdInt
                        },
                    data: {
                        favorites: '[]'
                    }
                }
                await prisma.users.update(obj);
            }

            // Запрос поля
            const favorites = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                },
                select:
                    {
                        favorites: true
                    }
            })

            // Преобразование строки в json
            let list = JSON.parse(favorites['favorites'])


            if (list.some(item => item.post_id === post_id)) {
                for (let index in list) {
                    if (list[index].post_id === post_id) {
                        if (condition === 'false' && comment === '') {
                            list.splice(index, 1)
                            message = 'successfully delete'

                        } else {
                            list.splice(index, 1)
                            list.push({ post_id : post_id, comment : comment, condition : condition })
                            message = 'successfully update'
                        }
                    }
                }
            } else {

                list.push({ post_id : post_id, comment : comment, condition : condition })
                message = 'successfully add'
                if (condition === 'false' && comment === '') {
                    list.pop()
                    message = 'nothing reasons for add'
                }
            }

            // Отправка данных
            const obj = {

                where:
                    {
                        id:userIdInt
                    },
                data: {
                    favorites: JSON.stringify(list)
                }
            }
            await prisma.users.update(obj);


            res.json({ "message" : message })
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