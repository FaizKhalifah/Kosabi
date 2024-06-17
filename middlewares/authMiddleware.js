import jwt from 'jsonwebtoken';
import User from '../models/user.js';

async function requireAuth (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'tokenRahasia');
            req.user = await User.findById(decodedToken.id);
            if (!req.user) {
                res.redirect('/login');
            } else {
                next();
            }
        } catch (err) {
            console.log(err.message);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

async function checkUser (req, res, next){
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken =  jwt.verify(token, 'tokenRahasia');
            res.locals.user = await User.findById(decodedToken.id);
        } catch (err) {
            console.log(err.message);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
};  

async function authRole(tipe){
    return async(req,res,next)=>{
        const token = req.cookies.jwt;
        if(token){
            try{
            const decodedToken = jwt.verify(token, 'tokenRahasia');
            req.user = await User.findById(decodedToken.id);
            if(req.user){
                const user = req.user;
                if(user.tipe!=tipe){
                    res.status(401);
                    res.redirect('/');
                }
                next();
            }else{
                res.redirect('/');
            }
            }catch(err){
                console.log(err.message);
                res.redirect('/');
            }
        }else{
            res.redirect('/login');
        }
    }
}

export default {requireAuth,checkUser}