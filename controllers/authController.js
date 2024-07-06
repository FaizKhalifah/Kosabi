import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function handleErrors(err){
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
      }

    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
      }
    
      if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }
    
      // validation errors
      if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
      }
    
      return errors;
}   

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id)=>{
    return jwt.sign({id},'koderahasia',{
        expiresIn:maxAge
    })
}

async function register_get(req,res){
    res.render('auth/register');
}

async function login_get(req,res){
    res.render('auth/login');
}

async function register_post(req,res){
    const {name,email,password}=req.body;
    const role = "user";
    try{
        const user = await User.create({name,role,email,password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

async function login_post(req,res){
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

async function logout_get(req,res){
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
export default{
    register_get,register_post,login_get,login_post,logout_get
}