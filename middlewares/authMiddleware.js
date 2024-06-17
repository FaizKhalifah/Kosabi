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

export default {requireAuth,checkUser}
