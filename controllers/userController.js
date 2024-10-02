import { PrismaClient } from "@prisma/client"
import debugLib from "debug";
const prisma = new PrismaClient();

const debug = debugLib("backend:userController")


const getUsers = async (req, res) => {
    debug("getUsers")
    try{
        const users = await prisma.user.findMany()

        res.render('user', { users: JSON.stringify(users) });
    } catch (error){ res.status(500).json(error); }
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        res.json(user);
    } catch (error){ res.status(500).json(error); }
}

const createUser = async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const birthDate = req.body.birthDate;

    try{
        if (!username) { return res.status(400).json({ error: "Name is required" }); }

        if (!password) { return res.status(400).json({ error: "Password is required" }); }

        if (!email) { return res.status(400).json({ error: "Email is required" }); }

        if (!birthDate) { return res.status(400).json({ error: "Birth Date is required" }); }


        const create =  await prisma.user.create({
            data: {
                username,
                password,
                email,
                // birthDate,
            }
        })

        res.json(create);
    } catch (error){ res.status(500).json({error}); }
};

const updateUser = async (req, res) => {

    const id = req.params.id;
    const username = req.body.username;

    try{
        if (!newName) {
            return res.status(400).json({ error: "Name is required" });
        }

        const update = await prisma.user.update({
            where: id,
            data: {
                username,
            }
        })


        res.json(update);
    } catch (error){ res.status(500).json(error); }
};

const deleteUser = async (req, res) => {

    const id = req.params.id;

    try{
        const del = prisma.user.delete({
            where: id
        })

        res.json(del);
    }
    catch (error){ res.status(500).json(error); }
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
