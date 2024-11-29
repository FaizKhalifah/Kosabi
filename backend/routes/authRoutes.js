const {login, register}= require("../controller/authController");
const express = require('express');
const router = express.Router();

router.get('/login',login);
router.get('/register',register);

module.exports=router;