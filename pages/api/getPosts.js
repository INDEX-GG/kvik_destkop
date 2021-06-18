import { PrismaClient } from '@prisma/client';
import { truncate } from 'fs/promises';
import { resolveHref } from 'next/dist/next-server/lib/router/router';


export default function handler(req, res){

if (req.method === 'POST'){
    

    const prisma = new PrismaClient();

    async function main() 
    {
        getPost();
        async function getPost()
        {
            const res = await prisma.posts.findUnique({ 
                    where: {
                        user_id: req.body.userID
                        } 
                }
                );
                console.log('tyt',res);
        }

        
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
