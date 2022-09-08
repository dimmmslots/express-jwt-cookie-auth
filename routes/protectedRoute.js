const router = require('express').Router();
const protectedController = require('../controllers/protectedController.js');
const authenticate = require('../middlewares/authenticate.js');
const blacklistredis = require('../middlewares/redisBlacklist.js');

router.get('/dashboard', authenticate(), blacklistredis(), protectedController.dashboard);

module.exports = router;