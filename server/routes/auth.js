const express = require('express');
const passport = require('passport');

const {ensureAuthenticated} = require('./../config/auth');

const AuthController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('user: ' + req.user);
    res.json(req.user);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);

        if(info) return res.json(info);

        req.logIn(user, (loginError) => {
            if(loginError) return next(loginError);
            console.log('Logged in');
            return res.json(user);
        });
    })(req, res, next);
    
    // AuthController.login(req.body, (results) => {
    //     res.json(results);
    // });
});

router.post('/create-account', (req, res) => {
    AuthController.createAccount(req.body, (results) => {
        res.json(results);
    })
});

module.exports = router;