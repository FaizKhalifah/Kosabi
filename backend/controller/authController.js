const {registerService,loginService}= require('../service/authService');

async function register(req,res) {
    registerService(req,res)
}

async function login(req,res) {
    console.log("controller login")
    loginService(req,res);
}

module.exports={
    login,register
}