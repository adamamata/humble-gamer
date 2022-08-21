
const router = require("express").Router();

//middleware to be added here

const Game = require("../models/Game.model");


router.get("/list", (req, res) => {
    Game.find()
    .then(games => {
        res.render('game/game-list', { games })
    })
    .catch(err => console.log(err))
})

router.get("/create", (req, res) => {
    res.render('game/add-game')
})

router.post("/create", (req, res) => {
const { name, genre, image, description, rating } = req.body;
Game.create({name, genre, image, description, rating})
    .then(newGame => {
        res.redirect('/game/list')
    })
    .catch(error => console.log(error));
})

router.get("/:gameId", (req, res) => {
    const { gameId } = req.params;
    Game.findOne({_id: gameId})
    .then(game => {
        res.render('game/game-details', { game })
    })
    .catch(error => console.log(error));
})

module.exports = router;