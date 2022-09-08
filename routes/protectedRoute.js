const router = require('express').Router();
const protectedController = require('../controllers/protectedController.js');
const authenticate = require('../middlewares/authenticate.js');
const blacklistredis = require('../middlewares/redisBlacklist.js');

router.get('/dashboard', authenticate(), blacklistredis(), protectedController.dashboard);
router.get('/ikad', authenticate(), blacklistredis(), protectedController.ikad);
router.get('/ikas', authenticate(), blacklistredis(), protectedController.ikas);

module.exports = router;