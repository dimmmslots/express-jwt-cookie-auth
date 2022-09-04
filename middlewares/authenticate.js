const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('dotenv').config().parsed;
const db = require('../helpers/database.js');
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
    // return [
    //     // authenticate JWT token and attach user to request object (req.user)
    //     jwt({ secret: config.JWT_SECRET, algorithms: ['HS256'] }).unless({
    //         path: [
    //             ,
    //     // attach user to request object (req.user)
    //     async (req, res, next) => {
    //         const user = await db.Users.findByPk(req.user.sub);
    //         if (!user) {
    //             return res.status(401).json({ message: 'Unauthorized' });
    //         }
    //         req.user = user.get();
    //         next();
    //     }
    // ]
}

module.exports = authenticate;