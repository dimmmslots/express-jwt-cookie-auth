const protectedController = {}

protectedController.dashboard = (req, res) => {
    res.sendFile('/pages/protected/dashboard.html', { root: 'public' });
}

protectedController.ikad = (req, res) => {
    res.sendFile('/pages/protected/ikad.html', { root: 'public' });
}

protectedController.ikas = (req, res) => {
    res.sendFile('/pages/protected/ikas.html', { root: 'public' });
}

module.exports = protectedController;