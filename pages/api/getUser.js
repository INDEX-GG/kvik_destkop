import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
   const prisma = new PrismaClient();
   if (req.method === 'POST') {
      console.log(req.body.id)
      async function main() 
     
      
      {
         console.log(req.body.id)
            await check();
         //Проверяем на наличие в таблице
         async function check() {
            console.log(req.body.id)
            // Передлать для определния того,что не правильно, логин или пароль 
            const user =  await prisma.users.findUnique({
               
               where: {
                  id: req.body.id
                    
               },
               select:
               {
                  name:true,
                  userPhoto:true,
                  about:true,
                  createdAt:true,
                  phone:true,
                  email:true,
                  raiting:true,
                  favorites:true,
                  subscriptions: true
               }
            })

            if (user) {
               return res.json({ user: user });
            } else {
               return res.json({ isset: false });
            }
         }
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