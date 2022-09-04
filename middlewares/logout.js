function logout() {
    return (req, res, next) => {
        // clean cookie
        res.clearCookie('token');
        return res.status(200).json({
            auth: false,
            token: null
        })
    }
}

module.exports = logout;