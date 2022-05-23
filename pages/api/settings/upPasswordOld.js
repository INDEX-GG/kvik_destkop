import { PrismaClient } from '@prisma/client';
import tokenCheck from "components/api/tokenCheck";
const globalSalt = process.env.GLOBAL_SALT
let toMD5 = require("components/api/MD5")
let decrypt = require("components/api/decrypt")
export default async function handler(req, res) {

    if (req.method === 'POST') {

        const prisma = new PrismaClient();
        const old_password = req.body.old_pass.toString()
        const new_password = req.body.new_pass.toString()

        const main = async () => {
            const userId = await tokenCheck(req.headers["x-access-token"])
            function hashing(hashed_text) {
                return toMD5(globalSalt + hashed_text + globalSalt)
            }
            const user = await prisma.users.findFirst({
                where: {
                    id: userId,
                    password: hashing(decrypt(old_password))
                }
            })
            if (user != null) {
                const obj = {
                    where:
                        {
                            id: userId
                        },
                    data: {
                        password: hashing(decrypt(new_password))
                    }
                }
                await prisma.users.update(obj);
                return { code: "OK" }
            } else {
                throw "Er"
            }
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api settings/upPassword ${error}`)
            if (error === "A token is required for authentication") {
                return res.status(403).send("A token is required for authentication");
            }
            if (error === "Invalid Token") {
                return res.status(401).send("Invalid Token");
            }
            // res.status(400).send("ошибка api subscribe: " + error.toString())
            res.json('ошибка api settings/upPassword, ', error)
        }
        finally {
            await prisma.$disconnect();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}