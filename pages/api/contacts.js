import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getContacts(req, res)
            break;
        case "POST":
            await saveContact(req, res)
            break;
        default:
            break;
    }
}

const getContacts = async (req, res) => {
    const contacts = await prisma.contact.findMany();
    res.json(contacts)
}

const saveContact = async (req, res) => {
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