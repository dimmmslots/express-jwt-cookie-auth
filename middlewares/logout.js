function logout() {
    return (req, res, next) => {
        // clean cookie
        res.clearCookie('token');
        return res.status(200).json({
            status: success,
            message: 'Logout successful',
            data: {
                token: null
            }
        })
    }
}

module.exports = logout;