const router = require('express').Router();
const userController = require('../controllers/userController.js');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;