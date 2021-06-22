import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
   
   if (req.method === 'POST') {
      const prisma = new PrismaClient();
      async function main() 
      {

         //Реализованны поля отношений и сделан запрос к таблице posts и users.
         const getProfileDate = await prisma.users.findUnique({
            where: {
              id: req.body.id
            },
            include: {
              posts: true
            },
            select:{
               
            }
          });
       
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
      return res.status(405).json({ message: 'method not allowed' })
   }
}