const express = require('express');

const router = express.Router();
const lfgController = require('./../controllers/lfgController');

router.get('/postings/:gameId', (req, res) => {
    lfgController.getGameLfgPostings(req.params.gameId)
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

router.post('/postings/create', (req, res) => {
    lfgController.createLfgPosting(req.body)
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

router.post('/postings/delete', (req, res) => {
    console.log(req.body);
    lfgController.deleteLfgPosting(req.body._id)
    .then(results => res.json(results))
    .catch(error => res.json(Error(error)));
});

module.exports = router;