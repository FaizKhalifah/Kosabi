import user from "../Model/user.js";

async function createUser(req, res){
    try{
        const newUser = new user(req.body);
        await newUser.save;
        res.status(201).send(newUser);
    }catch(err){
        res.status(400).send(err);
    }
}

async function getAllUsers(req,res){
    try{
        const users = await user.find();
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err);
    }
}

