const express = require('express');
const passport = require('passport');

const router = express.Router();
const igdb = require('./../api/igdb');
const {ensureAuthenticated} = require('./../config/auth');

router.get('/', (req, res) => {
    igdb.searchPopularGames((results) => {
        res.json(results);
    });
});

module.exports = router;