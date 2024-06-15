import jwt from "jsonwebtoken";
import userController from "./userController.js";
import bcrypt from "bcrypt";

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

export default{
    register_get,login_get
}