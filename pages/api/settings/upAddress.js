import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const { id, address } = req.body
            const obj = {
                where:
                    {
                        id: id
                    },
                data: {
                    address: address
                }
            }
            await prisma.users.update(obj);
            return { message: "successfully update" };
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api upAddress${e}`)
            res.json('ошибка api upAddress', e)
            res.status(405).end();
        }
        finally {
            await prisma.$disconnect();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}