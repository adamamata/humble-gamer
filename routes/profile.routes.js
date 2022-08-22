//Global variables
const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

// GET -upload-photo-
router.get('/upload-photo', (req, res) => {
    const { currentUser } =  req.session;
    res.render('profile/upload-photo')
    console.log(currentUser);
});

// POST -upload-photo-
router.post('/upload-photo', fileUploader.single('image'), (req, res) => {
    const { currentUser } = req.session;
    User.findByIdAndUpdate(currentUser._id, {image: req.file.path}, {new: true})
        .then((updatedUser) => {
            req.session.currentUser = updatedUser; 
            res.redirect('/')
        })
        .catch(err => console.log(err));
});

module.exports = router;