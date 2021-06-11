// pages/api/contacts.ts


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const user = JSON.parse(JSON.stringify(req.body));
    
/*     const saveUser = await prisma.users.create({ data: user });
    res.status(200).json(saveUser);   */

};