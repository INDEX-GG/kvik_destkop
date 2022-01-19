import {Pool} from "pg";
import similarPostsRules from '/public/similarPostsRules.json'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const main = async () => {
            let post_id = req.body.post_id
            const post  = await pool.query(`SELECT "posts".subcategory, "posts".category_id, "posts".city FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE posts.id = $1`, [post_id])
            if (typeof req.body.post_id !== 'number') {
                throw "Er"
            }
            const region = post.rows[0]['city'].toLowerCase()
            const category = post.rows[0]['subcategory']
            const full_category = post.rows[0]['category_id']
            let filterValue = undefined
            let constructQuery = ''
            for (let key in similarPostsRules.categories) {
                if (similarPostsRules.categories[key].alias === category) {
                    filterValue = similarPostsRules.categories[key].additional_fields
                }
            }
            if (filterValue !== undefined) {
                let additional_fields
                try {
                    const subs = (await pool.query(`SELECT * FROM "subcategories"."${category}" WHERE post_id = $1`, [req.body.post_id])).rows
                    additional_fields = subs[0]
                }
                catch (e) {
                    additional_fields = {}
                }
                if (additional_fields === undefined) {
                    const answer  = await pool.query(`SELECT * FROM "posts" WHERE (LOWER (posts.category_id) LIKE $1) AND posts.active = 0 AND posts.verify = 0 AND "posts"."id" != ${post_id} AND LOWER (city) LIKE $2 AND ((active_time >= $3) OR (active_time IS NULL)) LIMIT $4`, [full_category + '%', region + '%', new Date(), 24])
                    return(answer.rows)
                }
                for (let variable of filterValue) {
                    let bodyVariable  = additional_fields[variable]
                    if (bodyVariable !== undefined) {
                        constructQuery = constructQuery.concat(" AND LOWER (\"subcategories\".\"", category, "\".\"", variable, "\") = '", bodyVariable.toString().toLowerCase(), "'")
                    }
                }
                constructQuery = constructQuery.concat(" AND \"posts\".\"id\" != '", post_id, "'")
                let now_iso = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
                const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, posts.archived,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts" INNER JOIN "users" ON posts.user_id = users.id, "subcategories"."${category}" WHERE (posts.id = "subcategories".${category}.post_id) AND posts.active = 0 AND posts.verify = 0 ${constructQuery} AND LOWER (city) LIKE '${region}%' AND ((active_time >= '${now_iso}') OR (active_time IS NULL)) LIMIT 24`)

                //Добавить другие авто (Менее похожие)

                return(answer.rows)
            } else {
                const answer  = await pool.query(`SELECT * FROM "posts" WHERE (LOWER (posts.category_id) LIKE $1) AND posts.active = 0 AND posts.verify = 0 AND "posts"."id" != ${post_id} AND LOWER (city) LIKE $2 AND ((active_time >= $3) OR (active_time IS NULL)) LIMIT $4`, [full_category + '%', region + '%', new Date(), 24])
                return(answer.rows)
            }
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
