// Global Variables
const router = require("express").Router();
const Game = require("../models/Game.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");
const { isAdmin } = require("../middleware/route-guard");

// GET -list-
router.get("/list", isLoggedIn, (req, res) => {
    Game.find()
    .then(games => {
        res.render('game/game-list', { games })
    })
    .catch(err => console.log(err))
});

// GET -create-
router.get("/create", isLoggedIn, (req, res) => {
    res.render('game/add-game')
});

// POST -create-
router.post("/create", (req, res) => {
const { name, genre, image, description, rating } = req.body;
Game.create({name, genre, image, description, rating})
    .then(newGame => {
        res.redirect('/game/list')
    })
    .catch(error => console.log(error));
});

// GET -:gameId- 
router.get("/:gameId", isLoggedIn, (req, res) => {
    const { gameId } = req.params;
    Game.findOne({_id: gameId})
        .then(game => {
            res.render('game/game-details', { game })
        })
        .catch(error => console.log(error));
});

// GET -:gameId/edit-
router.get("/:gameId/edit", isLoggedIn, isAdmin, (req, res) => {
    const { currentUser } = req.session;
    console.log(currentUser);
    const { gameId } = req.params;
    Game.findById({_id: gameId})
        .then(game => {
            res.render('game/edit-game', { game })
        })
        .catch(error => console.log(error));
});

// POST -:gameId/edit-
router.post("/:gameId/edit", (req, res) => {
    const { gameId } = req.params;
    const { name, genre, image, description, rating } = req.body;
        Game.findByIdAndUpdate( gameId, { name, genre, image, description, rating  })
        .then(() => {
            res.redirect('/game/list');
        })
        .catch(err => console.error(err));
  

});

router.post("/:gameId/delete", isAdmin, (req, res) => {
    const { gameId } = req.params;
    const { name, genre, image, description, rating } = req.body;
    Game.findByIdAndDelete( gameId, { name, genre, image, description, rating  })
    .then(() => {
        res.redirect('/game/list')
    })
    .catch(err => console.log(err));

})

module.exports = router;