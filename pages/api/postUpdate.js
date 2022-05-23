import { PrismaClient } from '@prisma/client';
import tokenCheck from "components/api/tokenCheck";
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const prisma = new PrismaClient();
        const main = async () => {
            await tokenCheck(req.headers["x-access-token"])
            var photos = JSON.stringify({"photos": req.body.photo})
            const obj = {
                where:
                    {
                        id: req.body.post_id,
                    },
                data: {
                    title :req.body.title,
                    description :req.body.description,
                    price :req.body.price,
                    photo : photos
                }
            }
            await prisma.posts.update(obj);
            return {"message": "success"};
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api postUpdate ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api postUpdate, ' + error.toString())
        }
        finally {
            await prisma.$disconnect();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}