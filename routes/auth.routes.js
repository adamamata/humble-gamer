const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

// GET -signup-
router.get('/signup', isLoggedOut, (req, res) => {
    try {
        res.render('auth/signup');
    }
    catch(err) {
        console.log(err);
    }
});

// POST -signup-
router.post('/signup', (req, res) => {
    const { username, email, displayName, password, isAdmin } = req.body

    if (!username || !email || !displayName || !password){
        res.render('auth/signup', { errorMessage: "Please enter data in all fields."});
        return;
    }

    // Bcrypt User Generation
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashPassword => {
            return User.create(
                {
                    username,
                    email,
                    displayName,
                    password: hashPassword,
                    isAdmin
                }
            );
        })
        .then(user => {
            console.log(`New user created: ${user}`)
            res.redirect('/auth/login');
        })
        .catch(err => console.log(err));
});

// GET -login-
router.get('/login', isLoggedOut, (req, res) => {
    try{
        res.render('auth/login');
    }
    catch(err) {
        console.log(err);
    }
});

// POST -login- 
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password){
        res.render('auth/login', { errorMessage: 'Please enter data in all fields.'});
        return;
    }

    User.findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'This username has not been registered.'});
            }
            else if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                res.redirect('/');
            }
            else {
                res.render('auth/login', { errorMessage: 'Incorrect Password'});
            }
        })
        .catch(err => console.log(err));
});

// GET -logout-
router.get('/logout', isLoggedIn, (req, res) => {
    try {
        res.render('auth/logout');
    }
    catch(err) {
        console.log(err);
    }
});

// POST -logout-
router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/auth/login');
    })
});

module.exports = router;