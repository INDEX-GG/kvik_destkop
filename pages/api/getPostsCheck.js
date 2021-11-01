import {Pool} from "pg";

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });

        const main = async () => {
            const category = req.body.category.toLowerCase();
            const text = req.body.text.toLowerCase();
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            const price_min = req.body.price.min
            const price_max = req.body.price.max
            const check = req.body.check
            let constructQuery = ''
            if (!(price_min == null && price_max == null)) {
                if (price_min == null) {
                    constructQuery =  constructQuery.concat(" AND posts.price <= ", price_max)
                }
                else if (price_max == null) {
                    constructQuery =  constructQuery.concat(" AND posts.price >= ", price_min)
                }
                else {
                    constructQuery =  constructQuery.concat(" AND posts.price <= ", price_max, " AND posts.price >= ", price_min)
                }
            }
            for (const [key, value] of Object.entries(check)) {
                if (value != null) {
                    if (Array.isArray(value)) {
                        let arrayQuery = ''
                        for (let variable of value) {
                            arrayQuery = arrayQuery.concat(" AND LOWER (", category, ".", key, ") = '", variable.toLowerCase(), "'")
                        }
                        constructQuery =  constructQuery.concat(arrayQuery)
                    } else if (typeof value === 'object') {
                        if (!(value.max == null && value.min == null)) {
                            if (value.min == null) {
                                constructQuery = constructQuery.concat(" AND ", category, ".", key, " <= ", value.max)
                            } else if (value.max == null) {
                                constructQuery = constructQuery.concat(" AND ", category, ".", key, " >= ", value.min)
                            } else {
                                constructQuery = constructQuery.concat(" AND ", category, ".", key, " >= ", value.min, " AND ", category, ".", key, " <= ", value.max)
                            }
                        }
                    } else {
                        constructQuery = constructQuery.concat(" AND LOWER (", category, ".", key, ") = '", value.toLowerCase(), "'")
                    }
                }
            }
            const answer  = await pool.query(`SELECT posts.archived,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts","${category}" WHERE (posts.id = ${category}.post_id) AND posts.active = 0 AND posts.verify = 0 ${constructQuery} AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') ORDER BY id desc LIMIT ${page_limit} offset ${page}`)
            return(answer.rows)
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api postCategorySearch${e}`)
            res.json('ошибка api postCategorySearch', e)
            res.status(405).end();
        }
        finally {
            await pool.end();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}