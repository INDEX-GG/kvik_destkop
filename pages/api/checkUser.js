import { PrismaClient } from '@prisma/client';
import { truncate } from 'fs/promises';
import { resolveHref } from 'next/dist/next-server/lib/router/router';


export default function handler(req, res){

if (req.method === 'POST'){
    
    const prisma = new PrismaClient();

    async function main() 
    {
        check();
//Проверяем на наличие в таблице

        async function check()
        {
            const result = await prisma.users.findUnique({
                where: {
                    phone: req.body.phone,
                    password:req.body.password
                },
              })

            if(result){
                return res.json({idUser:result.id});
            }
            else{
                return res.json({ isset: false});
            }
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
