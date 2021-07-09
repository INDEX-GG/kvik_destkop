import { PrismaClient } from '@prisma/client';
export default function handler(req, res){

    if (req.method === 'POST'){
        const prisma = new PrismaClient();
        async function main() {
            const {id, reason} = req.body
            //Добавить причину перемещения в архив
            await prisma.$queryRaw(`UPDATE posts SET active = false ,archived = true WHERE ID IN (${id})`)  //UPDATE posts SET ArchReason = ${reason}
            res.json({ message: 'successfully update' })
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