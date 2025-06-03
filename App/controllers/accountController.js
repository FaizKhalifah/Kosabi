const userService = require('../services/Repositories/userService');

class accountController {
    async register(req, res) {
        res.render('accounts/register', { user: null });
    }

    async store(req, res) {
        try {
            await userService.create(req.body);
            res.redirect('/');
        } catch (error) {
            console.error("Error creating user:", error);
            res.render('accounts/register', { user: null, error: error.message });
        }
    }

    async login(req, res) {
        res.render('accounts/login', { user: null });
    }

    async authenticate(req, res) {
        try {
            const {user,token} = await userService.authenticate(req.body.username, req.body.password);
            req.session.user = user; // Simpan user ke session
            req.session.token = token; // Simpan token ke session
            res.redirect('/'); // Redirect ke halaman utama atau dashboard
        }
        catch(err){
             res.status(401).send(err.message);
        }
    }

    logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

module.exports = new accountController();