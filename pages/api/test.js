export default function handler(req, res) {
    if (req.method === 'GET') {


        const main = async () => {
            return {message:'this is maindev'}
        }

        main()
            .then(r => res.json(r))
            .catch(e => console.error(`ошибка api getDistricts${e}`))
    } else {
        res.status(405).json({ message: 'method not allowed' })
    }
}