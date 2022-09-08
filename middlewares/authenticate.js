const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('dotenv').config().parsed;
const db = require('../helpers/database.js');
const redisconn = require('../helpers/redisconn.js');
function authenticate() {
    return [
        async (req, res, next) => {
            // get the token from the cookies
            const token = req.cookies.token;
            if (!token) {
                // reddirect to login page
                return res.redirect('/login');
            }
            try {
                // verify the token
                const decoded = jsonwebtoken.verify(token, config.JWT_SECRET);
                // get the user
                db.Users.findByPk(decoded.sub)
                    .then(user => {
                        if (!user) {
                            return res.redirect('/login');
                        }
                        // set the user in the request
                        req.user = user;
                        next();
                    })
                    .catch(err => {
                        return res.redirect('/login');
                    });
            } catch (err) {
                return res.redirect('/login');
            }
        }
    ]
}

module.exports = authenticate;