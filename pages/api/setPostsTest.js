import { PrismaClient } from '@prisma/client';
import {Pool} from "pg";

const text2Bool = (string) => {
    return (string === 'true') || (string === true);
}
export default async function handler(req, res) {
    if (req.method === 'POST') {

        var data = req.body

        const prisma = new PrismaClient();

        const main = async () => {
            const communication = {
                phone: text2Bool(req.body.byphone),
                message: text2Bool(req.body.bymessages)
            }
            const alias = (req.body.alias).toString()
            var now = new Date()
            const obj = {
                data: {
                    country_code: 7,
                    user_id: +req.body.user_id,
                    category_id: alias,
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    trade: text2Bool(req.body.trade),
                    delivery: text2Bool(req.body.delivery),
                    secure_transaction: text2Bool(req.body.save_deal),
                    slug: "slug",
                    communication: JSON.stringify(communication),
                    address: req.body.location,
                    phone_hidden: false,
                    lon: 1234.00,
                    lat: 1234.00,
                    visits: 0,
                    commercial: 0,
                    date_start_commercial: now,
                    date_stop_commercial: now,
                    add_fields: { "fields": "none" },
                    archived_time: now,
                    created_at: now,
                    updated_at: now,
                    deleted_at: now,
                    date_verify: now,
                    verify: 0,
                    // verify: 1,
                    subcategory: req.body.subcategory,
                    verify_moderator: { "verify": [] },
                    coordinates: req.body.coordinates,
                    city: req.body.city,
                    photo: req.body.photo
                }
            }
            const allUsers = await prisma.posts.create(obj);
            return { id: allUsers.id };
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
                await pool.query(`INSERT INTO "public"."posts_reports" (request_body, time, error) VALUES (${data}, ${time}, ${error})`)
                await pool.end();
            } catch (e) {
                console.error(` --- ошибка Записи posts_reports лога! --- `)
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
