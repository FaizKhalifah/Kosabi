const jwt = require("jsonwebtoken");
const { User } = require('../models');

async function authMiddleware(req,res,next) {
    const token =  req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied, No Token Provided' });
    console.log("Token di middleware: "+token);
    try {
        const verified = jwt.verify(token, 'process.env.JWT_SECRET');
        console.log(verified);
        try{
          req.user = await User.findByPk(verified.id);
        }catch(err){
            console.log("error di middleware " + err);
            res.status(400).json({msg:err})
        }
        
        console.log(req.user)
        if (!req.user) throw new Error('User not found');
        next();
      } catch (err) {
        res.status(401).json({ error: 'Invalid Token' });
      }
    };
    
    module.exports = authMiddleware;
