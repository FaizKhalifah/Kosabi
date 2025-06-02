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
        const { username, password } = req.body;
        try {
            const user = await userService.authenticate(username, password);
            if (user) {
                req.session.user = user; // Simpan user ke session
                res.redirect('/'); // Redirect ke halaman utama atau dashboard
            } else {
                res.render('accounts/login', { error: 'Invalid username or password' });
            }
        } catch (error) {
            console.error("Authentication error:", error);
            res.render('accounts/login', { error: error.message });
        }
    }
}

module.exports = new accountController();