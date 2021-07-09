import { PrismaClient } from '@prisma/client';
export default function handler(req, res){

    if (req.method === 'POST'){
        const prisma = new PrismaClient();
        async function main() {
            const {id, phone} = req.body
            const idInt = Number(id)
            const obj = {
                where:
                    {
                        id: idInt
                    },
                data: {
                    phone: phone
                }
            }
            await prisma.users.update(obj);
            res.json({message : "successfully update"})
        }
        main()
            .catch((e) => {
                console.log("error: " +e);
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
            })
    }
    else {
        return res.status(405).json({message: 'method not allowed'})
    }
}