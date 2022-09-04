const indexController = {}

indexController.login = (req, res) => {
    // render html in public folder
    res.sendFile('/pages/login.html', { root: 'public' });
}

indexController.signup = (req, res) => {
    res.sendFile('/pages/signup.html', { root: 'public' });
}

module.exports = indexController;