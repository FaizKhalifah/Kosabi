import jwt from "jsonwebtoken";
import User from "../models/user.js";  
   


async function requireAuth(req,res,next){
  const token = req.cookies.jwt;  
  console.log(req.cookies);

  if(token){
      jwt.verify(token, 'koderahasia',async (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            res.redirect('/login');
          } else {
            console.log(decodedToken);
            const user = await User.findById(decodedToken.id);
            if(!user){
              res.redirect('/login');
            }
            req.user=user;
            next();
          }
        });
  }else{
      res.redirect('/login');
  }
}

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send('Access denied');
    }
    next();
  };
};

export default {
    requireAuth,checkRole
}