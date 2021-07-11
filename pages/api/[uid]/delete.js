import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient();
export default async (req, res) => {
    const { uid } = req.query
    console.log(uid)
    try {
        const deletedUser = await prisma.contact.delete({
            where: { id: Number(uid) },
        })
        res.json({ status: true })
    } catch (e) {
        console.log(e)
    }

}