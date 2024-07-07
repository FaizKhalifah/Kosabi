import jwt from "jsonwebtoken";
import User from "../models/user.js";

async function requireAuth(req,res,next){
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'koderahasia', (err, decodedToken) => {
            if (err) {
              console.log(err.message);
              res.redirect('/login');
            } else {
              console.log(decodedToken);
              next();
            }
          });
    }else{
        res.redirect('/login');
    }
}

export default {
    requireAuth
}