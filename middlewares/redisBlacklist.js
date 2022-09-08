const redisconn = require('../helpers/redisconn.js');

function blacklistredis() {
    return async (req, res, next) => {
        const path = req.path;
        // check if req path equals /login or /signup
        // if (path === '/login' || path === '/signup') {
        //     // redirect to home page
        //     return res.redirect('/protected/dashboard');
        // }
        const blacklisted = await redisconn.get('blacklist:' + req.cookies.token);
        if (blacklisted) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
        next();
    }
}

module.exports = blacklistredis;