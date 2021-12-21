import {Pool} from "pg";

const text2Bool = (string) => {
    return (string === 'true') || (string === true);
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const main = async () => {
            const key_list = ['auto', 'new_building', 'secondary_housing', 'rent_apartments', 'sell_rooms', 'rent_rooms', 'sell_houses_and_cottages', 'rent_houses_and_cottages', 'sell_office_space', 'sell_commercial_premises', 'sell_warehouse_space', 'sell_production_room', 'sell_free_premises', 'sell_building', 'rent_office_space', 'rent_commercial_premises', 'rent_warehouse_space', 'rent_production_room', 'rent_free_premises', 'rent_building', 'sell_izhs', 'sell_snt', 'sell_agriculturalland', 'sell_commercialland', 'sell_garage', 'sell_parkingplace', 'rent_garage', 'rent_parkingplace', 'sell_abroad', 'rent_abroad', 'vacancies', 'summary', 'laptops', 'smartphones', 'telephones', 'tablets', 'electronic_books', 'chargers_power_supplies', 'smart_watches_and_fitness_bracelets', 'desktop_computers', 'monitors', 'manipulators__input_devices', 'expendable_materials', 'motherboards_perif', 'ram', 'data_storage', 'housings_corp', 'video_cards_componentsss', 'other_comp', 'personal_computer_accessories', 'ram_for_servers', 'server_network_hardware', 'steering_wheels_gamepads_joysticks', 'printers', 'mfps_and_scanners', 'consumables_for_office_equipment', 'ups_and_surge_protectors', 'tv_sets_cat2', 'hi_fi_technology', 'tv_accessories', 'audio_engineering', 'video_engineering', 'for_home', 'for_personalized_care', 'for_kitchen', 'climatic_equipment', 'table_setting', 'cooking_food', 'food_storage', 'household_goods', 'video_surveillance', 'plants_and_seeds', 'cats', 'dogs', 'goods_for_children_toys', 'bicycles']
            const category = req.body.category.toLowerCase();
            const full_category = req.body.categoryFullName.toLowerCase();
            const text = req.body.text.toLowerCase();
            const delivery = text2Bool(req.body.delivery);
            const save_deal = text2Bool(req.body.save_deal);
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            const price_min = req.body.price.min
            const price_max = req.body.price.max
            const check = req.body.check
            const time = req.body.time
            const sort = req.body.sort.toLowerCase()
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
            const region_includes = req.body.region_includes.toLowerCase()
            let region_excludes = req.body.region_excludes.toLowerCase()
            if (region_excludes === '') {
                region_excludes = '!'
            }
            let constructQuery = ''
            if (delivery === true) {
                constructQuery =  constructQuery.concat(" AND posts.delivery = '", true, "'")
            }
            if (save_deal === true) {
                constructQuery =  constructQuery.concat(" AND posts.secure_transaction = '", true, "'")
            }
            if (time != null) {
                constructQuery =  constructQuery.concat(" AND posts.created_at >= '", time, "'")
            }
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
            if (!(key_list.includes(category))) {
                const answer  = await pool.query(`SELECT * FROM "posts" WHERE (LOWER (posts.category_id) LIKE '${full_category}%') AND posts.active = 0 AND posts.verify = 0 ${constructQuery} AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') AND LOWER (city) LIKE '${region_includes}%' AND LOWER (city) NOT LIKE '%${region_excludes}' ${sort_value} LIMIT ${page_limit} offset ${page}`)
                return(answer.rows)
            } else {
                for (const [key, value] of Object.entries(check)) {
                    if (value != null) {
                        if (Array.isArray(value)) {
                            if (value.length !== 0) {
                                let arrayQuery = ''
                                for (let variable of value) {
                                    arrayQuery = arrayQuery.concat(" (", category, ".\"", key, "\") = '", variable.toString(), "' OR")
                                }
                                constructQuery =  constructQuery.concat("AND (", arrayQuery.substring(0, arrayQuery.length - 3), ")")
                            }
                        } else if (typeof value === 'object') {
                            if (!(value.max == null && value.min == null)) {
                                if (value.min == null) {
                                    constructQuery = constructQuery.concat(" AND ", category, ".\"", key, "\" <= ", value.max)
                                } else if (value.max == null) {
                                    constructQuery = constructQuery.concat(" AND ", category, ".\"", key, "\" >= ", value.min)
                                } else {
                                    constructQuery = constructQuery.concat(" AND ", category, ".\"", key, "\" >= ", value.min, " AND ", category, ".\"", key, "\" <= ", value.max)
                                }
                            }
                        } else {
                            constructQuery = constructQuery.concat(" AND LOWER (", category, ".\"", key, "\") = '", value.toLowerCase(), "'")
                        }
                    }
                }
                const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, posts.archived,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts" INNER JOIN "users" ON posts.user_id = users.id,"${category}" WHERE (posts.id = ${category}.post_id) AND posts.active = 0 AND posts.verify = 0 ${constructQuery} AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') AND LOWER (city) LIKE '${region_includes}%' AND LOWER (city) NOT LIKE '%${region_excludes}' ${sort_value} LIMIT ${page_limit} offset ${page}`)
                return(answer.rows)
            }
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api getPostCheck ${e}`)
            res.json('ошибка api getPostCheck, ', e)
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