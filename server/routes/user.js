const express = require('express');

const router = express.Router();
const userController = require('./../controllers/userController');

router.get('/game-favorites', (req, res) => {
    userController.getUserGameFavorites(req.user.user)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

router.post('/game-favorites/add/:gameId', (req, res) => {
    userController.addGameToFavorites(req.user.user, req.params.gameId)
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

router.post('/game-favorites/remove/:gameId', (req, res) => {
    userController.removeGameFromFavorites(req.user.user, req.params.gameId)
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

module.exports = router;