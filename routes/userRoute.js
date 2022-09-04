const router = require('express').Router();
const userController = require('../controllers/userController.js');
const logout = require('../middlewares/logout.js');
const bodyValidation = require('../middlewares/bodyValidation.js');
const indexController = require('../controllers/indexController.js');

router.post('/register', bodyValidation, userController.create, indexController.login);
router.post('/auth', bodyValidation, userController.authenticate);
router.get('/logout', logout());

module.exports = router;