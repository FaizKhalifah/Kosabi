const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require("bcrypt");

async function registerService(req,res) {
    const {name,email,password} = req.body;
    passwordString = password.toString();
    try{
        let user = await User.create({ name, email, password:passwordString, role:"user" });
        res.status(201).json({ message: 'User registered successfully', user });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

async function loginService(req,res) {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
      }
      const passwordMatch = await bcrypt.compare(password.toString(), user.password);
      if (!passwordMatch) {
            return res.status(400).json({msg: 'Wrong password' });
      }
      // Generate JWT
      const token = jwt.sign({ id: user.id, role: user.role }, 'process.env.JWT_SECRET', {
        expiresIn: '1h',
      });

      console.log(token)
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports={
    registerService,loginService
}