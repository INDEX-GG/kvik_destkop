import {Pool} from "pg";
import similarPostsRules from '/public/similarPostsRules.json'
export default async function handler(req, res) {

    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const main = async () => {
            let post_id = req.body.post_id
            let region = req.body.region
            let category = req.body.category.toLowerCase()
            let filterValue = undefined
            let constructQuery = ''

            for (let key in similarPostsRules.categories) {
                if (similarPostsRules.categories[key].alias === category) {
                    filterValue = similarPostsRules.categories[key].additional_fields
                }
            }
            if (filterValue !== undefined) {
                for (let variable of filterValue) {
                    console.log(variable);
                    console.log(req.body[variable]);
                    constructQuery = constructQuery.concat(" AND LOWER (", category, ".\"", category, "\") = '", variable.toLowerCase(), "'")
                }
                console.log("Выдача с фильтрами")
            } else {
                console.log("Стандартная выдача")
            }

            console.log(req.body.test)
            let test = req.body.test.replace(/'/g, "").replace(/"/g, "")
            console.log(test)

            console.log(post_id)
            console.log(region)
            console.log("---");
            console.log(constructQuery);

            // const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, posts.id, posts.user_id, posts.category_id, posts.price, posts.old_price, posts.photo, posts.rating, posts.created_at, posts.delivery, posts.reviewed, posts.address, posts.phone, posts.trade, posts.verify_moderator, posts.commercial, posts.secure_transaction, posts.title, posts.email, posts.viewing, posts.city FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE active = 0 AND verify = 0  AND LOWER (city) LIKE '${region_includes}%' AND LOWER (city) NOT LIKE '${region_excludes}%' AND LOWER (category_id) LIKE '${category_includes}%' AND LOWER (category_id) NOT LIKE '${category_excludes}%' ${sort_value} LIMIT ${page_limit} offset ${page}`)
            // return(answer.rows)

            return "asgasfasfsafsaf"
        }




        try {
            const response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api similarPosts ${e}`)
            res.json('ошибка api similarPosts, ', e)
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