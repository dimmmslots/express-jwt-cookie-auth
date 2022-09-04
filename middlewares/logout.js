function logout() {
    return (req, res, next) => {
        // clean cookie
        res.clearCookie('token');
        return res.redirect('/login');
    }
}

module.exports = logout;