import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {

    if (req.method === 'POST') {

        const prisma = new PrismaClient();

        async function main() {
            console.log(req.body)
            const idint = req.body.id
            const id = Number(idint)
            const ver = req.body.verify_moderator



            const array = []
            let arr = ver
            for (let value of arr) {
                array.push(value.toString())
            }


            const verify = {"verify":array}


            const obj = {
                where:
                    {
                        id: id
                    },
                data: {
                    verify_moderator: verify
                }
            }
            await prisma.posts.update(obj);
            res.json({message : "successfully update"})

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