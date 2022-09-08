const redisconn = require('../helpers/redisconn.js');

function logout() {
    return (req, res, next) => {
        // add cookie to redis for blacklist
        redisconn.set(req.cookies.token, 'blacklist:' + req.cookies.token, 'EX', 60 * 60 * 24 * 7);
        // clean cookie
        res.cookie('token', '', { maxAge: 0 });
        return res.redirect('/login');
    }
}

module.exports = logout;