import { PrismaClient } from '@prisma/client';
import { resolveHref } from 'next/dist/next-server/lib/router/router';


export default function handler(req, res){

console.log("inAPI");
if (req.method === 'POST'){
    console.log(req.body);

    const prisma = new PrismaClient();

    async function main() 
    {
        check();
//Проверяем на наличие в таблице

        async function check()
        {
            const result = await prisma.users.findUnique({
                where: {
                    phone: req.body.phone
                },
              })

          if(result) {
              console.log("Уже есть");
              return res.json({error: true});
          } else {
              add();
          }
        
        }




    async function add()
    {
        //Заносим в таблицу 
            let D = req.body;
            var now = new Date()
        const obj = {
            data: {
                name: `${req.body.name} ${req.body.surname}`,
                password:req.body.password,
                phone: req.body.phone,
                createdAt:now
            }
        }
        let i = 1;
        //     const allUsers = await prisma.users.create( {  
        //      data: {
        //         name: req.body.name,
        //         password:req.body.password,
        //         phone: req.body.phone
        
        //     }
        // }
        // );
        const allUsers = await prisma.users.create(obj);
            console.log("AllUsers")
            console.log(allUsers)
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