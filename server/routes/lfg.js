const express = require('express');

const router = express.Router();
const lfgController = require('./../controllers/lfgController');

router.get('/postings/:gameId', (req, res) => {
    lfgController.getGameLfgPostings(req.params.gameId)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

module.exports = router;