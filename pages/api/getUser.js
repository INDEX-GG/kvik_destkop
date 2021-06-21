import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
   if (req.method === 'POST') {
      const prisma = new PrismaClient();
      async function main() {
         check();
         //Проверяем на наличие в таблице
         async function check() {
            // Передлать для определния того,что не правильно, логин или пароль 
            console.log(req.body)
            const user = await prisma.users.findUnique({
               where: {
                  id: req.body.id
               }
            })

            console.log(user.name);
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