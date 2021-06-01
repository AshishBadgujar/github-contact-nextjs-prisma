import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient();
export default async (req, res) => {
    const data = req.body;
    try {
        const savedData = await prisma.contact.create({
            data
        })
        res.json(savedData)
    } catch (error) {
        console.log(error)
    }

}