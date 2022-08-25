// Global Variables
const router = require("express").Router();
const Game = require("../models/Game.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const { isLoggedIn } = require("../middleware/route-guard");
const { isLoggedOut } = require("../middleware/route-guard");
const { isAdmin } = require("../middleware/route-guard");
const axios = require("axios");
const { updateOne } = require("../models/User.model");
const apiKey = process.env.API_KEY;
const apiBase = "https://api.rawg.io/api/games?key="

router.get('/results', (req, res) => {
   const { searchItem } = req.query;
   axios
    .get(`${apiBase}${apiKey}&search=${searchItem}&page_size=5`)
    .then((response) => {
        const games = response.data.results;
        res.render("game/search-results", { games });
    })
    .catch(err => console.log(err));
});

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
router.post("/create", isLoggedIn, (req, res) => {
const { name, genre, image, description, rating } = req.body;
Game.create({name, genre, image, description, rating})
    .then(newGame => {
        res.redirect('/game/list')
    })
    .catch(error => console.log(error));
});

router.post('/:gameId/favourites', async (req, res ) => {
    try {
        const { gameId } = req.params;
        const { currentUser } = req.session; 
        const game = await Game.findById(gameId);
        const user = await User.findById(currentUser._id);
        user.favouriteGames.push(game);
        await user.save();
        res.redirect('/');
    }
    catch (err) {
        console.log(err)
    }
});

// GET -:gameId- 
router.get("/:gameId", isLoggedIn, (req, res) => {
    const { gameId } = req.params;
    const { currentUser } = req.session;
    Game.findOne({_id: gameId})
        .populate("comments")
        .populate({
            path: 'comments',
            populate: {
                path: "user",
                model: "User"
            }
        })
        .then(game => {
            res.render('game/game-details', { game, currentUser });
        })
        .catch(error => console.log(error));
});

// POST -:gameId- 
router.post('/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const { comment } = req.body
    const game = await Game.findOne({_id: gameId});
    Comment.create({user: req.session.currentUser._id, comment})
        .then(async(newComment) => {
            game.comments.push(newComment._id);
            await game.save();
        })
        .then(() => res.redirect(`/game/${gameId}`))
        .catch((err) => console.log(err));
});

// GET -:gameId/edit-
router.get("/:gameId/edit", isLoggedIn, isAdmin, (req, res) => {
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
            //need to update or save what has been selected
            res.redirect('/game/list');
        })
        .catch(err => console.error(err));
});

router.post("/:gameId/delete", isAdmin, (req, res) => {
    const { gameId } = req.params;
    const { name, genre, image, description, rating } = req.body;
    Game.findByIdAndDelete( gameId, { name, genre, image, description, rating })
    .then(() => {
        res.redirect('/game/list')
    })
    .catch(err => console.log(err));
});

module.exports = router;