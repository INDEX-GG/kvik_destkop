import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async () => {
            const obj = {
                where:
                    {
                        id: req.body.user_id
                    },
                data: {
                    location :req.body.data,
                }
            }
            await prisma.users.update(obj);
            return {"message": "success"};
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api userLocation ${e}`)
            res.json('ошибка api userLocation', e)
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