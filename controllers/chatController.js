import { PrismaClient } from "@prisma/client"
import debugLib from "debug";
const prisma = new PrismaClient();

const debug = debugLib("backend:chatController")

const getMessages = async (req, res) => {
    try
    {
        const chats = await prisma.chat.findMany()
        debug(chats)
        res.render('chat', { chats: JSON.stringify(chats) });
    } catch (error){ res.status(500).json(error); }
};

const createMessage = async (req, res) => {

    const content = req.body.content;
    const senderId = req.body.senderId;
    const toId = req.body.toId;

    try{
        if (!content) { return res.status(400).json({ error: "Content is required" }); }

        if (!senderId) { return res.status(400).json({ error: "Sender id is required" }); }

        if (!toId) { return res.status(400).json({ error: "Reciever id is required" }); }

        await prisma.user.findMany({
            where: {
                id: senderId
            }
        }).catch(error => {
            debug(error)
            res.json({message: "Reciever not found"})
        })

        await prisma.user.findMany({
            where: {
                id: toId
            }
        }).catch(error => {
            debug(error)
            res.json({message: "Reciever not found"})
        })


        const post = await prisma.chat.create({
            data: {
                content,
                senderId,
                toId
            }
        })

        res.json(post);
    } catch (error){ res.status(500).json(error); }
};

const updateMessage = async (req, res) => {

    const id = req.params.id;
    const content = req.body.content;

    try{
        if (!content) { return res.status(400).json({ error: "Content is required" }); }


        const update = await prisma.chat.update({
            where: id,
            data: {
                content
            }
        })


        res.json(update);
    } catch (error){ res.status(500).json(error); }
};

const deleteMessage = async (req, res) => {

    const id = req.params.id;

    try{

        const del = await prisma.chat.delete({
            where: id,
        })

        res.json(del);
    }
    catch (error){ res.status(500).json(error); }
};

export {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
}