export default function handler(req, res) {
    if (req.method === 'GET') {


        const main = async () => {
            return {message:'test__0808'}
        }

        main()
            .then(r => res.json(r))
            .catch(e => console.error(`ошибка api test${e}`))
    } else {
        res.status(405).json({ message: 'method not allowed' })
    }
}