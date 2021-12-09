import { PrismaClient } from '@prisma/client';
import {Pool} from "pg";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        var data = req.body
        const prisma = new PrismaClient();

        const check  = await prisma.$queryRaw(`SELECT * FROM "posts" WHERE id = ${req.body.post_id} AND posts.user_id = ${req.body.user_id}`)
        if (check.length === 0) {
            return res.status(403).send("Invalid User");
        }

        const main = async () => {
            const data = req.body
            const array = data["fields"]
            let columns = ''
            let values = ''
            array.forEach((element) => {
                if (element.fields !== '') {
                    columns += '"' + element.alias + '", '
                    values += "'" + element.fields + "', "
                }
            })

            columns = columns.slice(0, -2)
            values = values.slice(0 ,-2)

            const check_exist  = await prisma.$queryRaw(`SELECT * FROM ${req.body.subcategory} WHERE post_id = ${req.body.post_id}`)
            if (check_exist.length !== 0) {
                return res.status(403).send("Already exist");
            }

            await prisma.$queryRaw(`INSERT INTO ${req.body.subcategory} (${columns}) VALUES (${values})`)
            return{ message: 'successfully update' };
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            try {
                const pool = new Pool({ connectionString: "postgresql://kvik:2262@192.168.145.183:5432/kvik_reports?schema=public" });
                data = JSON.stringify(data)
                data = "'[" + data + "]'"
                const error = "'[" + e.toString().replace(/"/g, '""').replace(/'/g, "''") + "]'"
                const time = "'[" + new Date().toISOString() + "]'"
                await pool.query(`INSERT INTO "public"."subcategory_reports" (request_body, time, error) VALUES (${data}, ${time}, ${error})`)
                await pool.end();
            } catch (e) {
                console.error(` --- ошибка Записи subcategory_reports лога! --- `)
            }
            // console.error(`ошибка api setPosts: ${e}`)
            console.log(`Ошибка api setPostsTest, логи в бд`)
            res.json('ошибка api setPosts', e)
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