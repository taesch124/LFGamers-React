const express = require('express');

const router = express.Router();
const commentController = require('./../controllers/commentController');

router.get('/game/:gameId', (req, res) => {
    commentController.getThreadsByGame(req.params.gameId)
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        res.json(error);
    });
});

router.post('/create', (req, res) => {
    commentController.createThread(req.body)
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        res.json(error);
    })
});

module.exports = router;