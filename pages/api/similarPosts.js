import {Pool} from "pg";

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });

        const main = async () => {
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            const sort = req.body.sort.toLowerCase()
            const region_includes = req.body.region_includes.toLowerCase()
            let region_excludes = req.body.region_excludes.toLowerCase()
            if (region_excludes === '') {
                region_excludes = '!'
            }
            const category_includes = req.body.category_includes.toLowerCase()
            let category_excludes = req.body.category_excludes.toLowerCase()
            if (category_excludes === '') {
                category_excludes = '!'
            }
            let sort_value
            switch (sort) {
                case 'default':
                    sort_value = 'ORDER BY id desc'
                    break;
                case 'new':
                    sort_value = 'ORDER BY id desc'
                    break;
                case 'price_by_ascending':
                    sort_value = 'ORDER BY price asc'
                    break;
                case 'price_by_descending':
                    sort_value = 'ORDER BY price desc'
                    break;
                default:
                    sort_value = ''
                    break;
            }
            const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, posts.id, posts.user_id, posts.category_id, posts.price, posts.old_price, posts.photo, posts.rating, posts.created_at, posts.delivery, posts.reviewed, posts.address, posts.phone, posts.trade, posts.verify_moderator, posts.commercial, posts.secure_transaction, posts.title, posts.email, posts.viewing, posts.city FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE active = 0 AND verify = 0  AND LOWER (city) LIKE '${region_includes}%' AND LOWER (city) NOT LIKE '${region_excludes}%' AND LOWER (category_id) LIKE '${category_includes}%' AND LOWER (category_id) NOT LIKE '${category_excludes}%' ${sort_value} LIMIT ${page_limit} offset ${page}`)
            return(answer.rows)
        }

        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getPostsPortion ${e}`)
            res.json('ошибка api getPostsPortion, ', e)
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