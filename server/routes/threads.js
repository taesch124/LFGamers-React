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

router.get('/comments/:threadId', (req, res) => {
    commentController.getCommentsByThread(req.params.threadId)
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

router.post('/:parentId/comments/create', (req, res) => {
    let parentId = req.params.parentId;
    let data = req.body;
    data.parentId = parentId;
    commentController.createComment(data)
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        res.json(error);
    });
});

module.exports = router;