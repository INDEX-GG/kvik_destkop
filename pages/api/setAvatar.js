import { PrismaClient } from '@prisma/client';

const fs = require('fs');
const utf8 = require('utf8');

export default function handler(req, res){

if (req.method === 'POST'){

    console.log(req.body);
 
    // fs.writeFile("./public/profile/test.webp", req.body, function(error){
 
    //     if(error) throw error; // если возникла ошибка
    // } );

    const prisma = new PrismaClient();

    async function main() 
    {
        
        async function add()
        {
            
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