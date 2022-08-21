const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;

  try {
    res.render("index", { currentUser });
  }
  catch(err) {
    console.log(err)
  }
});

module.exports = router;
