

// UPDATE posts SET active = true ,archived = false WHERE ID IN (67, 69, 70)
//  posts.archived  --  true
//  posts.active    --  false

import { PrismaClient } from '@prisma/client';
export default function handler(req, res){
    if (req.method === 'POST'){
        const prisma = new PrismaClient();
        async function main() {
            const {id, reason} = req.body
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