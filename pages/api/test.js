export default async function handler(req, res) {

    if (req.method === 'POST') {

        const main = async () => {
            return({"ping": "pong"})
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
    } else {
        res.json({ message: 'method not allowed' })
        res.status(405).end()
    }
}