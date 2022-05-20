import { PrismaClient } from "@prisma/client"
import { sign } from "jsonwebtoken"
let toMD5 = require("components/api/MD5")
let decrypt = require("components/api/decrypt")
const globalSalt = process.env.GLOBAL_SALT

export default async function handler(req, res) {
    if (req.method === "POST") {
        const prisma = new PrismaClient();

        const main = async () => {
            const userPassword = req.body.password
            const userPhone = req.body.phone
            const saltedPassword = globalSalt + decrypt(userPassword) + globalSalt
            const hashedPassword = toMD5(saltedPassword)
            const user = await prisma.users.findUnique({
                where: {
                    login: {
                        phone: decrypt(userPhone),
                        password: hashedPassword
                    }
                }
            })
            if (user != null) {
                const claims = {sub: user.id}
                const jwt_refresh = sign(claims, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET, { expiresIn: "380d"})
                return { idUser: user.id, "jwt_refresh": jwt_refresh}
            } else {
                throw 403
            }
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(response))
        }
        catch (error) {
            console.error(`ошибка api mobile/checkUser ${error}`)
            if (parseInt(error) === 403) { res.status(403).json({isset: false}) }
            res.status(400).json({ message: "ошибка api mobile/checkUser"})
        }
        finally {
            await prisma.$disconnect()
        }

    } else {
        res.json({message: "method not allowed"})
        res.status(405).end()
    }
}
