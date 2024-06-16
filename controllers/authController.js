import jwt from "jsonwebtoken";
import userController from "./userController.js";
import bcrypt from "bcrypt";
import user from "../models/user.js";

const maxAge = 60*60;
const createToken = (id)=>{
    return jwt.sign({id},'tokenRahasia',{expiresIn:maxAge});
}

async function register_get(req,res){
    res.render('auth/register');
}

async function login_get(req,res){
    res.render('auth/login');
}

async function register_post(req,res){
    try{
        const newUser = new user(req.body);
        await newUser.save();
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: newUser._id });
    }catch(err){
        res.status(400).json(err);
    }
    
}

export default{
    register_get,register_post,login_get
}