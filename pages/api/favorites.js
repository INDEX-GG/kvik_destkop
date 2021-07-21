import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {

            const user_id = req.body.user_id
            const post_id = req.body.post_id
            const userIdInt = Number(user_id)
            let comment = req.body.comment
            const condition = req.body.condition
            if (req.body.comment === null || req.body.comment === undefined || req.body.comment === "undefined"){
                comment = ''
            }

            // Проверка и заполнение пустого поля
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

            // Запрос поля
            const favorites = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                },
                select:
                    {
                        favorites:true
                    }
            })

            // Преобразование строки в список
            let preList = favorites['favorites'].substring(1)
            let preList2 = preList.substring(0, preList.length - 1)
            let list = preList2.split(',')

            // Проверка наличия в списке входящих данных

            const firstExist =  preList2.split(',').join(':').split(':')
            if (firstExist.includes(post_id)) {
                for (let index in list) {
                    let secondLevel = (list[index]).split(':')
                    if (secondLevel.includes(post_id)) {
                        if (condition === 'false') {
                            list.splice(index,1)
                            list.push(post_id + ":" + comment + ":" + condition)
                            if (comment === '') {
                                list.splice(index,1)
                            }
                        } else{
                            list.splice(index,1)
                            list.push(post_id + ":" + comment + ":" + condition)
                        }
                    }
                }
            } else {
                list.push(post_id + ":" + comment + ":" + condition)
            }

            // Удаление пустых значений
            let nothIndex = list.indexOf('')
            if (nothIndex > -1) {
                list.splice(nothIndex, 1)
                }

            // Отправка данных
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