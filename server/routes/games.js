const express = require('express');

const router = express.Router();
const gameController = require('./../controllers/igdbController');

router.get('/', (req, res) => {
    gameController.getAndSaveGames(results => {
        res.json(results);
    });
});

router.get('/search-title/:title', (req, res) => {
    console.log('searching for game');
    gameController.searchGameByTitle(req.params.title, results => {
        res.json(results);
    });
});

module.exports = router;