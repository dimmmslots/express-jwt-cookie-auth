const router = require('express').Router();
const indexController = require('../controllers/indexController.js');
const userController = require('../controllers/userController.js');

router.get('/login', indexController.login);
router.get('/signup', indexController.signup)

module.exports = router;