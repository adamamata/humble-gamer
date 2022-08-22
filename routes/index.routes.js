const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;
  console.log(currentUser);

  try {
    res.render("index", { currentUser });
  }
  catch(err) {
    console.log(err)
  }
});

module.exports = router;
