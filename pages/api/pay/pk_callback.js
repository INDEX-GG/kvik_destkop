import {Pool} from "pg"
import axios from "axios";
// import CryptoJS from "crypto-js";

let MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

let payment_login = process.env.STG_LOGIN
let payment_pass = process.env.STG_PASS
let payment_sign = process.env.STG_SIGN
let payment_reg_url = process.env.STG_PAYMENT_CHECK
let payment_source = process.env.STG_PAYMENT_STATUS

const relevant_actions = {
    2: {
        "description": "Поднятие вверх объявления KVIK",
        "price": 19.00},
    3: {
        "description": "Выделение цветом объявления KVIK",
        "price": 39.00},
    4: {
        "description": "XL объявление KVIK",
        "price": 39.00},
    5: {
        "description": "Комбо продвижение KVIK",
        "price": 59.00}
}

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const main = async () => {

            let body = req.body
            let now = new Date()
            let day_in_ms = 1000*60*60*24
            let active_time = new Date(Math.floor(now) + day_in_ms*7)

            let create_callback = await pool.query(`INSERT INTO "payments"."callbacks" ("query", "time", "source") VALUES ($1, $2, $3) RETURNING "id"`, [body, now, payment_source])
            let callback_id = create_callback.rows[0].id

            let callback_body_id = body.id
            let callback_body_sum = body.sum
            let callback_body_client_id = body.clientid
            let callback_body_order_id = body.orderid
            let check_key = MD5(callback_body_id.toString() + callback_body_sum.toString() + callback_body_client_id.toString() + callback_body_order_id.toString() + payment_sign)
            if ( check_key !== body.key ) {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Ошибка проверки подписи", callback_id])
                throw "err 1"
            }

            let transaction = await pool.query(`SELECT * FROM "payments"."transactions" WHERE "order_number" = $1 AND "source" = $2`, [callback_body_order_id, payment_source])
            if (transaction.rows.length !== 1) {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Транзакция не была найдена, или mdOrder не уникален", callback_id])
                throw "err 2"
            } else if (transaction.rows[0].status_transaction === "paid") {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Сообщение об оплате уже было записано", callback_id])
                throw "err 3"
            }

            let payment_id = transaction.rows[0].order_id
            let payment_reg_answer = await axios.get(payment_reg_url,
                {
                    params: {id: payment_id},
                    auth: {username: payment_login, password: payment_pass},
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                }).then(r => r.data)
            let check_status = payment_reg_answer.status
            let check_payment_answer = JSON.stringify(payment_reg_answer)

            if (
                check_status.toString() === "paid" &&
                callback_body_client_id.toString() === transaction.rows[0].user_id.toString() &&
                (new Set([
                    parseFloat(callback_body_sum).toFixed(2),
                    parseFloat(transaction.rows[0].amount).toFixed(2),
                    parseFloat(payment_reg_answer.pay_amount).toFixed(2)
                ])).size === 1
            ) {

                let actions = [...new Set(transaction.rows[0].actions)]
                let amount = transaction.rows[0].amount
                let user_id = transaction.rows[0].user_id
                let post_id = transaction.rows[0].post_id

                // / Здесь включается функция Транзакция + запись о оплате
                // / Кошелек
                if (actions.includes(0) && actions.length === 1) {
                    await pool.query(`BEGIN`)
                    await pool.query(`UPDATE "payments"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_id" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, callback_body_id, payment_source])
                    await pool.query(`INSERT INTO "payments"."transactions_virtual_rubles" ("amount", "description", "date") VALUES ($1, $2, $3)`, [amount, "Пополнение кошелька", now])
                    await pool.query(`UPDATE "public"."users" SET "virtual_rubles_balance" = "virtual_rubles_balance" + $1 WHERE id =$2`, [amount, user_id])
                    // Bonus Transaction
                    // Bonus Update
                    await pool.query(`COMMIT`)

                // / Оплата услуг
                } else {

                    actions.forEach(element => {if (typeof element !== 'number' || element <= 0  || ! (Object.keys(relevant_actions).map(key => parseInt(key))).includes(element)) {throw "Er 4"}});
                    await pool.query(`BEGIN`)
                    if ( actions.includes(2) ) { await pool.query(`UPDATE "public"."posts" SET "rotation_date" = $1 WHERE "id" = $2`, [now, post_id]) }
                    if ( actions.includes(3) ) { await pool.query(`UPDATE "public"."posts" SET "color_selection" = $1 WHERE "id" = $2`, [active_time, post_id]) }
                    if ( actions.includes(4) ) { await pool.query(`UPDATE "public"."posts" SET "size_selection" = $1 WHERE "id" = $2`, [active_time, post_id]) }
                    if ( actions.includes(5) ) { await pool.query(`UPDATE "public"."posts" SET "rotation_date" = $1, "color_selection" = $2, "size_selection" = $2 WHERE "id" = $3`, [now, active_time, post_id]) }
                    await pool.query(`UPDATE "payments"."transactions" SET "pay_time" = $1, "status_transaction" = $2, "check_payment_answer" = $3 WHERE "order_number" = $4 AND "source" = $5`, [now, "paid", check_payment_answer, callback_body_order_id, payment_source])

                    await pool.query(`COMMIT`)



                }

            } else {
                await pool.query(`UPDATE "payments"."callbacks" SET "error" = $1 WHERE "id" = $2`, ["Не пройдена проверка getOrderStatusExtended", callback_id])
                throw "err 5"
            }
            return MD5(callback_body_id.toString() + payment_sign)

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