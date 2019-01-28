const express = require('express');
const passport = require('passport');

const router = express.Router();
const igdb = require('./../api/igdb');

router.get('/', (req, res) => {
    igdb.searchPopularGames((results) => {
        res.json(results);
    });
});

module.exports = router;