const db = require('../helpers/database.js');
const User = db.Users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

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
        if (user && bcrypt.compareSync(password, user.hash)) {
            const { hash, ...userWithoutHash } = user.get();
            res.send({
                ...userWithoutHash
            });
        } else {
            res.status(400).send('Username or password is incorrect');
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while authenticating the user.'
        });
    }
}

module.exports = userController;