const router = require('express').Router();
const indexController = require('../controllers/indexController.js');
const checkLogin = require('../middlewares/checkLogin.js');

router.get('/login', checkLogin(), indexController.login);
router.get('/signup', checkLogin(), indexController.signup)

module.exports = router;