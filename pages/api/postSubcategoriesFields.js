import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient();
        async function main() {
            async function getSub() {
                const results = await prisma.posts.findFirst({
                    where: {
                        id: Number(req.body.post_id)
                    },
                    select: {
                        subcategory: true,
                    }
                })
                return results;
            }
            const results = await getSub();
            const resultName = results['subcategory']
            if (results['subcategory'] != null && results['subcategory'] != '') {
                const subs = await prisma.$queryRaw(`SELECT * FROM ${resultName} WHERE post_id = '${req.body.post_id}'`)
                res.json(subs);
            } else {
                res.json('error');
            }








        }
        main()
            .catch((e) => {
                console.log("error: " + e);
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
            })
    }
    else {
        res.status(405).json({ message: 'method not allowed' })
    }
}