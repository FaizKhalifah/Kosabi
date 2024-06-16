import User from "../models/user.js";

async function createUser(req, res){
    try{
        console.log(req.body);
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    }catch(err){
        res.status(400).send(err);
    }
}

async function getAllUsers(req,res){
    try{
        const users = await User.find();
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err);
    }
}

async function getUserbyId(req,res){
    try{
        const fetchedUser = User.findById(req.params.id);
        if(!fetchedUser){
            return res.status(404).send("error");
        }
        res.status(200).send(fetchedUser);
    }catch(err){
        res.status(400).send(err);
    }
}

async function updateUser(req,res){
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updateduser) {
            return res.status(404).send();
        }
        res.status(200).send(updateduser);
    } catch (err) {
        res.status(400).send(err);
    }
};

async function deleteUser(req,res){
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send();
        }
        res.status(200).send(deletedUser);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default {
    createUser, getAllUsers,getUserbyId,deleteUser,updateUser
}