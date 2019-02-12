const express = require('express');

const router = express.Router();
const platformController = require('./../controllers/platformController');

router.get('/', (req, res) => {
    platformController.getAllPlatforms()
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

module.exports = router;