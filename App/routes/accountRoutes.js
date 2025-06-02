const express = require('express');
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();
accountRouter.get('/register', accountController.register);
accountRouter.post('/register', accountController.store);
accountRouter.get('/login', accountController.login);
accountRouter.post('/login', accountController.authenticate);
accountRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.redirect('/'); // Redirect ke halaman utama jika terjadi error
        }
        res.clearCookie('connect.sid'); // Hapus cookie session
        res.redirect('/login'); // Redirect ke halaman login
    });
});

module.exports = accountRouter; 