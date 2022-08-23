const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  User.findOne({_id: currentUser._id})
    .populate("favouriteGames")
    .then((user) => {
      res.render('index', { user })
    })
});

module.exports = router;
