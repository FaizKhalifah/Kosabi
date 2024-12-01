const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function authMiddleware(req,res,next) {
    const token =  req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access Denied, No Token Provided' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(verified.id); // Attach user data to request
        if (!req.user) throw new Error('User not found');
        next();
      } catch (err) {
        res.status(401).json({ error: 'Invalid Token' });
      }
    };
    
    module.exports = authMiddleware;
