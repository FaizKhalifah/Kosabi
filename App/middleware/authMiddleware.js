class authMiddleware{
    isAuthenticated(req, res, next) {
        if (req.session && req.session.user) {
            // User is authenticated, proceed to the next middleware or route handler
            return next();
        }else {
            res.redirect('/login');
        }
    }
  
};

module.exports = new authMiddleware();