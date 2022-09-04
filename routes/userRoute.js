const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authenticate = require('../middlewares/authenticate.js');
const logout = require('../middlewares/logout.js');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/protected', authenticate(), (req, res) => {
    res.send('Protected route');
});
router.get('/logout', logout());

module.exports = router;