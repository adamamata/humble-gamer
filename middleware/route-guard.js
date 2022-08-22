const isLoggedIn = ((req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/auth/login');
    }
    next();
});

const isLoggedOut = ((req, res, next) => {
    if (req.session.currentUser){
        return res.redirect('/');
    }
    next();
});

const isAdmin = ((req, res, next) => {
    if (req.session.currentUser.isAdmin !== true){
        return res.redirect('/game/list');
    }
    next();
});

module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
}