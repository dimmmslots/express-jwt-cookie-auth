const protectedController = {}

protectedController.dashboard = (req, res) => {
    console.log(req.token);
    res.sendFile('/pages/protected/dashboard.html', { root: 'public' });
}

module.exports = protectedController;