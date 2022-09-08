const indexController = {}

indexController.login = (req, res) => {
    if (req.cookies.token) {
        // redirect to home page
        return res.redirect('/protected/dashboard');
    }
    // render html in public folder
    res.sendFile('/pages/login.html', { root: 'public' });
}

indexController.signup = (req, res) => {
    if (req.cookies.token) {
        // redirect to home page
        return res.redirect('/protected/dashboard');
    }
    res.sendFile('/pages/signup.html', { root: 'public' });
}

module.exports = indexController;