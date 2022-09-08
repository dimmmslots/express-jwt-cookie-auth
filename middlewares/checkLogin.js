

function checkLogin() {
    return function (req, res, next) {
        // check if user is logged in
        if (req.cookies.token) {
            return res.redirect('/protected/dashboard');
        }
        // redirect to login page
        next();
    }
}

module.exports = checkLogin;