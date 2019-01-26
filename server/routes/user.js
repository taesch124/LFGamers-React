const express = require('express');

const AuthController = require('./../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    AuthController.login(req.body, (results) => {
        console.log(results);
        res.json(results);
    });
});

router.post('/create-account', (req, res) => {
    console.log(req.body);
    AuthController.createAccount(req.body, (results) => {
        console.log(results);
        res.json(results);
    })
});

module.exports = router;