import {Pool} from "pg"
import axios from "axios";
import MD5 from "crypto-js/md5";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            const signature = req.body.sign
            delete req.body.sign
            const signature_check = Buffer.from(MD5(JSON.stringify(req.body) +  process.env.SIGN_SECRET).toString()).toString('base64')

            if (signature !== signature_check) {
                throw "Sign Er"
            }

            req.body.posts_view.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});
            req.body.posts_cont.forEach(element => {if (typeof element !== 'number' || element <= 0) {throw "Er"}});

            const clickhouse_url = process.env.NEXT_PUBLIC_CLHS
            let posts_for_viewing = [...new Set(req.body.posts_view)]
            if (posts_for_viewing.length >= 1) {
                let constructQuery =  ""
                posts_for_viewing.forEach(element => constructQuery =  constructQuery.concat("(" + element + ", now()), "));
                constructQuery = constructQuery.slice(0, -2)
                let fullQuery = `INSERT INTO clickstream Values ` + constructQuery
                await axios.post(clickhouse_url, fullQuery).then(r => r.data)
            }

            let posts_for_contacts = [...new Set(req.body.posts_cont)]
            if (posts_for_contacts.length >= 1) {
                let constructQuery =  ""
                posts_for_contacts.forEach(element => constructQuery =  constructQuery.concat("(" + element + ", now()), "));
                constructQuery = constructQuery.slice(0, -2)
                let fullQuery = `INSERT INTO contactstream Values ` + constructQuery
                await axios.post(clickhouse_url, fullQuery).then(r => r.data)
            }

            return {"message": "success"}

        }
        try {
            let response = await main()
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api streamPosts ${e}`)
            res.json('ошибка api streamPosts, ', e)
            res.status(405).end()
        }
        finally {
            await pool.end()
        }
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}
