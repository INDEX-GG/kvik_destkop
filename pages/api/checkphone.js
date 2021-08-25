import axios from 'axios';
import qs from 'qs';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const main = async () => {
            const urlAuth = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/auth',
                urlCall = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/number/call-auth',
                urlApprove = 'https://pbx-guru.web.pbxmaker.ru/index.php/restapi/number/approve',
                dataAuth = qs.stringify({ 'grant_type': 'password', 'scope': 'users', 'client_id': '1kvik', 'client_secret': 'bqnqxnhwdb4' }),
                phoneNumber = qs.stringify({'caller_id': JSON.parse(JSON.stringify(req.body.phone))});

            const auth = await axios.post(urlAuth, dataAuth, {headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }})
                .then(r => r.data)

            const call = await axios.post(urlCall, phoneNumber, {headers: {
                    'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${auth.access_token}`
                }})
                .then(r => r.data)

            const dataApprove = qs.stringify({
                'action': 'call-auth',
                'caller_id': call.caller_id,
                'tmp_caller_id': call.tmp_caller_id
            });

            const approve = await axios.post(urlApprove, dataApprove, {headers: {
                    'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${auth.access_token}`
                }})
            approve
            return await call.tmp_caller_id;
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