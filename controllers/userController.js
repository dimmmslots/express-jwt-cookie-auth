const db = require('../helpers/database.js');
const User = db.Users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const config = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const userController = {}

userController.create = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 8);
        const role = req.params.role === 'admin' ? 'admin' : 'user';
        const user = {
            email: req.body.email,
            password: req.body.password,
            hash,
            role
        };
        User.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the user.'
                });
            });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user.'
        });
    }
}

userController.authenticate = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(bcrypt.compareSync(password, user.hash))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ sub: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: 86400 });
        // clean cookie
        res.clearCookie('token');
        return res.cookie('token', token, { httpOnly: true }).status(200).json({
            auth: true,
            token
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while authenticating the user.'
        });
    }
}

module.exports = userController;