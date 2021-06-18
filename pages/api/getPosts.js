import { PrismaClient } from '@prisma/client';
import { truncate } from 'fs/promises';
import { resolveHref } from 'next/dist/next-server/lib/router/router';


export default function handler(req, res){

if (req.method === 'POST'){
    

    const prisma = new PrismaClient();

    async function main() 
    {

        
        async function getPost()   //Этот запрос нужно будет связать с таблицей
        {
            const results =  await prisma.posts.findMany({
                    skip:req.body.of,
                    take:10,
                    select: {
                        category_id:true,
                        photo: true,
                        rating: true,
                        created_at: true,
                        delivery: true,
                        reviewed: true,
                        address:true,
                        phone:true,
                        trade:true,
                        verify_moderator:true,
                        commercial:true
                      }
                }
            )
            console.log(results);
            return  results;
        }

        const results = await getPost();
        return res.json({result:results});
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
