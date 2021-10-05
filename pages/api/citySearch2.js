import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        const main = async() => {
            let { name } = req.body
            const limit = 10
            const lowername = name.toLowerCase()
            let cities = await prisma.$queryRaw(`SELECT region, municipality, settlement, type, latitude_dd, longitude_dd, unical_in_country, unical_in_region FROM russian_cities WHERE LOWER (settlement) LIKE '${lowername}%' LIMIT ${limit}`)
            console.log(cities.length)
            if (cities.lenght === limit) {
                return cities
            } else {
                const partLimit = limit - cities.length
                const citiesMiddle = await prisma.$queryRaw(`SELECT region, municipality, settlement, type, latitude_dd, longitude_dd, unical_in_country, unical_in_region FROM russian_cities WHERE LOWER (settlement) LIKE '%${lowername}%' AND LOWER (settlement) NOT LIKE '${lowername}%' LIMIT ${partLimit}`)
                cities.push(123)
                for (let city of citiesMiddle) {
                    cities.push(city)
                }
                return cities
            }
        }

        try {
            let response = await main();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response))
        }
        catch (e) {
            console.error(`ошибка api citySearch${e}`)
            res.json('ошибка api citySearch', e)
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