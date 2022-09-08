const db = require('../helpers/database.js');
const User = db.Users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const config = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');

const userController = {}

userController.create = async (req, res, next) => {
    try {
        let { email, password, role } = req.body;
        const duplicate = await User.findOne({ where: { email: email } });
        if (duplicate) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists'
            });
        }
        const hash = bcrypt.hashSync(password, 8);
        console.log(`role: ${role}`);
        role = role === 'admin' ? 'admin' : 'user';
        const user = {
            email,
            password,
            hash,
            role
        };
        User.create(user)
            .then(() => {
                next();
            })
            .catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: err.message || 'Some error occurred while creating the user.'
                });
            });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Some error occurred while creating the user.'
        });
    }
}

userController.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(bcrypt.compareSync(password, user.hash))) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }
        const token = jwt.sign({ sub: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: 86400 });
        // clean cookie
        res.clearCookie('token');
        res.cookie('token', token, { maxAge: 86400 * 2, httpOnly: true }).json({
            status: 'success',
            message: 'Login successful',
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message || 'Some error occurred while authenticating the user.'
        });
    }
}

module.exports = userController;