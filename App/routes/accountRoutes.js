const express = require('express');
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();
accountRouter.get('/register', accountController.register);
accountRouter.post('/register', accountController.store);
accountRouter.get('/login', accountController.login);
accountRouter.post('/login', accountController.authenticate);
accountRouter.get('/logout', accountController.logout);

module.exports = accountRouter; 