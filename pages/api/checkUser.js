import { PrismaClient } from '@prisma/client';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            check();
            //Проверяем на наличие в таблице
            async function check() {
                // Передлать для определния того,что не правильно, логин или пароль 
                const user = await prisma.users.findUnique({
                    where: {
                        login: {
                            phone: req.body.phone,
                            password: req.body.password
                        }
                    }
                })

                console.log(user);
                if (user) {
                    return res.json({ idUser: user.id });
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