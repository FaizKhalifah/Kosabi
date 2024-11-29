const User = require('../models/user.js');

async function registerService(req,res) {
    const {name,email,password} = req.body;
    try{
        let user = await User.create({ name, email, password, role:"user" });
        res.status(201).json({ message: 'User registered successfully', user });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

async function loginService(req,res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !user.validPassword(password)) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports={
    registerService,loginService
}