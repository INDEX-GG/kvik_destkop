import axios from 'axios';
export default async function handler(req, res) {
    if (req.method === 'POST') {

        const main = async () => {
            const phone = req.body.phone
            const code = (req.body.code).toString()
            const redis_url = process.env.NEXT_PUBLIC_REDIS + '/check_phone_kvik/' + phone
            const redis_data = {'data': code, 'secret': process.env.NEXT_PUBLIC_REDIS_SECRET}
            const redis = await axios.post(redis_url, redis_data)
                .then(r => r.data)
            return redis
        }
        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api checkphone${e}`)
            res.json('ошибка api checkphone', e)
            res.status(405).end();
        }

    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}