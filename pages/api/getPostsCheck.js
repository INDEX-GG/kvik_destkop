import {Pool} from "pg";
import CryptoJS from "crypto-js";

function encrypt(string) {
    return CryptoJS.AES.encrypt(string, process.env.NEXT_PUBLIC_MY_SECRET).toString();
}


// const text2Bool = (string) => {
//     return (string === 'true') || (string === true);
// }


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const main = async () => {
            const key_list = ['sell_apartments', 'rent_apartments', 'sell_rooms', 'rent_rooms', 'sell_houses_and_cottages', 'rent_houses_and_cottages', 'sell_commercial_property', 'rent_commercial_property', 'sell_land', 'sell_garages_and_parking_spaces_second', 'rent_garages_and_parking_spaces_second', 'sell_abroad', 'rent_abroad', 'auto', 'buses', 'trucks', 'construction_machinery', 'agricultural_machinery', 'all_terrain_vehicle', 'house_on_wheels', 'motorcycles', 'mopeds_and_scooters', 'atvs_quad', 'karting', 'atvs_and_buggy', 'snowmobiles', 'boats_and_yachts', 'jet_skis', 'motor_boats', 'trailers', 'laptops', 'laptops_consumables_and_spare_parts', 'smartphones', 'telephones', 'smartphones_consumables_and_spare_parts', 'electronic_books', 'tablets', 'tablets_and_e_books_accessories', 'tablets_and_e_books_consumables_and_spare_parts', 'protective_glasses_films', 'smart_watches_and_fitness_bracelets', 'monitors', 'processors_cat', 'motherboards_periphery', 'ram', 'video_cards_components', 'pc_housings', 'hard_drives_and_ssd', 'data_storage', 'consumables_and_spare_parts', 'personal_computer_accessories', 'printers', 'mfp_and_scanners', 'consumables_for_office_equipment', 'tv_sets', 'hi_fi_technology', 'tv_accessories', 'games_consoles_and_programs', 'for_home', 'for_personalized_care', 'for_kitchen', 'climatic_equipment', 'table_setting', 'cooking_food', 'food_storage', 'household_goods', 'video_surveillance', 'plants_and_seeds', 'vacancies_it', 'vacancies_auto_biz', 'vacancies_amin_job', 'vacancies_invest', 'vacancies_students_ve', 'vacancies_fin', 'vacancies_manager', 'vacancies_nko', 'vacancies_homer', 'vacancies_zkh', 'vacancies_art', 'vacancies_talk', 'vacancies_pr', 'vacancies_medical', 'vacancies_science', 'vacancies_security', 'vacancies_sales', 'vacancies_product', 'vacancies_insure', 'vacancies_build', 'vacancies_logistic', 'vacancies_tourism', 'vacancies_personal_manager', 'vacancies_beauty', 'vacancies_lower', 'summary_it', 'summary_auto_biz', 'summary_amin_job', 'summary_invest', 'summary_students_ve', 'summary_fin', 'summary_manager', 'summary_nko', 'summary_homer', 'summary_zkh', 'summary_art', 'summary_talk', 'summary_pr', 'summary_medical', 'summary_science', 'summary_security', 'summary_sales', 'summary_product', 'summary_insure', 'summary_build', 'summary_logistic', 'summary_tourism', 'summary_personal_manager', 'summary_beauty', 'summary_lower', 'cats', 'dogs', 'goods_for_children_toys', 'bicycles']
            const category = req.body.category.toLowerCase();
            const full_category = req.body.categoryFullName.toLowerCase();
            const text = req.body.text.toString().toLowerCase();
            // const delivery = text2Bool(req.body.delivery);
            // const save_deal = text2Bool(req.body.save_deal);
            const page_limit = req.body.page_limit
            const page = (req.body.page - 1) * page_limit
            const price_min = req.body.price.min
            const price_max = req.body.price.max
            const check = req.body.check
            const time = req.body.time
            const sort = req.body.sort.toLowerCase()
            const region_includes = req.body.region_includes.toLowerCase()
            let region_excludes = req.body.region_excludes.toLowerCase()
            if (region_excludes === '') {
                region_excludes = '!'
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
            for (let symbol of category) {
                if (["_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].includes(symbol) === false) {
                    throw "Er"
                }
            }
            for (let symbol of full_category) {
                if (["_",",","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].includes(symbol) === false) {
                    throw "Er"
                }
            }
            let constructQuery = ''
            // if (delivery === true) {
            //     constructQuery =  constructQuery.concat(" AND posts.delivery = '", true, "'")
            // }
            // if (save_deal === true) {
            //     constructQuery =  constructQuery.concat(" AND posts.secure_transaction = '", true, "'")
            // }
            if (time != null) {
                for (let symbol of time) {
                    if (["-",":"," ","0","1","2","3","4","5","6","7","8","9"].includes(symbol) === false) {
                        throw "Er"
                    }
                }
                constructQuery =  constructQuery.concat(" AND posts.created_at >= '", time, "'")
            }
            if (!(price_min == null && price_max == null)) {
                if (price_min == null) {
                    if (typeof price_max !== 'number') {
                        throw "Er"
                    }
                    constructQuery =  constructQuery.concat(" AND posts.price <= '", price_max, "'")
                }
                else if (price_max == null) {
                    if (typeof price_min !== 'number') {
                        throw "Er"
                    }
                    constructQuery =  constructQuery.concat(" AND posts.price >= '", price_min, "'")
                }
                else {
                    if (typeof price_min !== 'number' || typeof price_max !== 'number') {
                        throw "Er"
                    }
                    constructQuery =  constructQuery.concat(" AND posts.price <= '", price_max, "' AND posts.price >= '", price_min, "'")
                }
            }
            if (!(key_list.includes(category))) {
                const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, users.business_account AS user_business_account, posts.manager_phone, posts.manager_name, posts.id, posts.user_id, posts.category_id, posts.price, posts.old_price, posts.photo, posts.rating, posts.created_at, posts.delivery, posts.reviewed, posts.address, posts.phone, posts.trade, posts.verify_moderator, posts.commercial, posts.secure_transaction, posts.title, posts.email, posts.viewing, posts.city FROM "posts" INNER JOIN "users" ON posts.user_id = users.id WHERE (LOWER (posts.category_id) LIKE $1) AND posts.active = 0 AND posts.verify = 0 ${constructQuery} AND (LOWER (title) LIKE $2 OR LOWER (description) LIKE $2) AND LOWER (city) LIKE $3 AND LOWER (city) NOT LIKE $4 AND ((active_time >= $5) OR (active_time IS NULL)) ${sort_value} LIMIT $6 offset $7`, [full_category + '%', '%' + text + '%', region_includes + '%', region_excludes + '%', new Date(), page_limit, page])

                answer.rows.forEach(
                    element => {
                        if (element.user_business_account && element.manager_name !== null) {element.user_name = element.manager_name}
                        if (element.user_business_account && element.manager_phone !== null) {element.user_phone = element.manager_phone}
                        element.user_phone = encrypt(element.user_phone)
                    });

                return(answer.rows)
            } else {
                for (const [key, value] of Object.entries(check)) {
                    for (let symbol of key) {
                        if (["_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"].includes(symbol) === false) {
                            throw "Er"
                        }
                    }
                    if (value != null) {
                        if (Array.isArray(value)) {
                            if (value.length !== 0) {
                                let arrayQuery = ''
                                for (let variable of value) {
                                    arrayQuery = arrayQuery.concat(" (\"subcategories\".\"", category, "\".\"", key, "\") = '", variable.toString(), "' OR")
                                }
                                constructQuery =  constructQuery.concat("AND (", arrayQuery.substring(0, arrayQuery.length - 3), ")")
                            }
                        } else if (typeof value === 'object') {

                            if (!(value.max == null && value.min == null)) {
                                if (value.min == null) {
                                    constructQuery = constructQuery.concat(" AND \"subcategories\".\"", category, "\".\"", key, "\" <= ", value.max)
                                } else if (value.max == null) {
                                    constructQuery = constructQuery.concat(" AND \"subcategories\".\"", category, "\".\"", key, "\" >= ", value.min)
                                } else {
                                    constructQuery = constructQuery.concat(" AND \"subcategories\".\"", category, "\".\"", key, "\" >= ", value.min, " AND \"subcategories\".\"", category, "\".\"", key, "\" <= ", value.max)
                                }
                            }
                        } else if (typeof value === 'number') {
                            constructQuery = constructQuery.concat(" AND \"subcategories\".\"", category, "\".\"", key, "\" = '", value.toString().toLowerCase(), "'")
                        } else {
                            // for (let symbol of value.toLowerCase()) {
                            //     if (["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
                            //         "а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"].includes(symbol) === false) {
                            //         throw "Er"
                            //     }
                            // }
                            constructQuery = constructQuery.concat(" AND LOWER (\"subcategories\".\"", category, "\".\"", key, "\") = '", value.toString().toLowerCase(), "'")
                        }
                    }
                }
                let now_iso = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
                const answer  = await pool.query(`SELECT users.name AS user_name, users."userPhoto" AS user_photo, users.phone AS user_phone, users.raiting AS user_raiting, users.business_account AS user_business_account, posts.manager_phone, posts.manager_name, posts.archived,posts.secure_transaction,posts.description,posts.id,posts.category_id,posts.price,posts.photo,posts.rating,posts.created_at,posts.delivery,posts.reviewed,posts.address,posts.phone,posts.trade,posts.verify, posts.verify_moderator, posts.active,posts.title,posts.email FROM "posts" INNER JOIN "users" ON posts.user_id = users.id, "subcategories"."${category}" WHERE (posts.id = "subcategories".${category}.post_id) AND posts.active = 0 AND posts.verify = 0 ${constructQuery} AND (LOWER (title) LIKE '%${text}%' OR LOWER (description) LIKE '%${text}%') AND LOWER (city) LIKE '${region_includes}%' AND LOWER (city) NOT LIKE '${region_excludes}%' AND ((active_time >= '${now_iso}') OR (active_time IS NULL)) ${sort_value} LIMIT ${page_limit} offset ${page}`)

                answer.rows.forEach(
                    element => {
                        if (element.user_business_account && element.manager_name !== null) {element.user_name = element.manager_name}
                        if (element.user_business_account && element.manager_phone !== null) {element.user_phone = element.manager_phone}
                        element.user_phone = encrypt(element.user_phone)
                    });

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