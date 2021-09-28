import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            let answer = []
            const user_id = req.body.user_id
            const userIdInt = Number(user_id)
            const favorites = await prisma.users.findFirst({
                where: {
                    id: userIdInt
                },
                select:
                    {
                        favorites: true
                    }
            })
            let list = JSON.parse(favorites['favorites'])
            console.log(list);
            const data = req.body.field
            for (let idx in data) {
                let message = 'error'
                const post_id = data[idx].post_id
                let comment = data[idx].comment
                const condition = data[idx].condition
                if (data[idx].comment === null || data[idx].comment === undefined || data[idx].comment === "undefined") {
                    comment = ''
                }
                if (list.some(item => item.post_id === post_id)) {
                    for (let index in list) {
                        if (list[index].post_id === post_id) {
                            if (condition === 'false' && comment === '') {
                                list.splice(index, 1)
                                message = 'successfully delete'
                            } else {
                                list.splice(index, 1)
                                list.push({ post_id: post_id, comment: comment, condition: condition })
                                message = 'successfully update'
                            }
                        }
                    }
                } else {
                    list.push({ post_id: post_id, comment: comment, condition: condition })
                    message = 'successfully add'
                    if (condition === 'false' && comment === '') {
                        list.pop()
                        message = 'nothing reasons for add'
                    }
                }
                answer.push(message)
            }
            const obj = {
                where:
                    {
                        id: userIdInt
                    },
                data: {
                    favorites: JSON.stringify(list)
                }
            }
            await prisma.users.update(obj);
            return answer;
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api deleteManyFavorites${e}`)
            res.json('ошибка api deleteManyFavorites', e)
            res.status(405).end();
        }
        finally {
            await prisma.$disconnect();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}