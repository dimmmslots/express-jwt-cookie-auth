const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authenticate = require('../middlewares/authenticate.js');
const logout = require('../middlewares/logout.js');
const bodyValidation = require('../middlewares/bodyValidation.js');

router.post('/register', bodyValidation, userController.create);
router.post('/authenticate', bodyValidation, userController.authenticate);
router.get('/protected', authenticate(), (req, res) => {
    res.send('You are authenticated, role: ' + req.user.role);
});
router.get('/logout', logout());

module.exports = router;