module.exports = {
    isLogin: (req, res, next) => {
        if (req.session.userId) {
            next(); // User is logged in, proceed to the next middleware/controller
        } else {
            res.redirect('/dashboard/login'); // User is not logged in, redirect to the login page
        }
    },
    isLogout: (req, res, next) => {
        if (req.session.userId) {
            res.redirect('/dashboard/'); // User is logged in, redirect to the dashboard
        } else {
            next(); // User is not logged in, proceed to the next middleware/controller
        }
    },
    logout : (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Failed to logout');
            }
            res.redirect('/login'); // Redirect to login page after logout
        });
    }
}

