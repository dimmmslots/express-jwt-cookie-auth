const router = require('express').Router();
const protectedController = require('../controllers/protectedController.js');
const authenticate = require('../middlewares/authenticate.js');

router.get('/dashboard', authenticate(), protectedController.dashboard);

module.exports = router;