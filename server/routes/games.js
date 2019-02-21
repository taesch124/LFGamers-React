const express = require('express');

const router = express.Router();
const igdbController = require('./../controllers/igdbController');
const gameController = require('./../controllers/gameController');

router.get('/', (req, res) => {
    igdbController.getAndSaveGames()
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

router.get('/search-title/:title', (req, res) => {
    igdbController.searchGameByTitle(req.params.title)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
    gameController.searchGameById(req.params.id)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

module.exports = router;