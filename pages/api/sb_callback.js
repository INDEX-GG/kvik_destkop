import {Pool} from "pg"

export default async function handler(req, res) {
    if (req.method === 'POST') {


        const pool = new Pool({ connectionString: process.env.DATABASE_URL_CALLBACKS })
        const main = async () => {


            let date = new Date()
            let body = req.body
            console.log(body);
            await pool.query(`INSERT INTO "public"."callbacks" ("body", "time") VALUES ($1, $2)`, [body, date])
            return { message: 'OK'}


        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка callback ${e}`)
            res.status(400).json({ message: 'NOT OK'})
        }
        finally {
            await pool.end()
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}