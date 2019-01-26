const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      let user = {username: username, password: password};
      let error = {error: true, message: 'Not set up yet'};
      return done(null, false, error);
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    User.getUser(user.id, (results) => {
      console.log(user.id, results);
      done(null, results);
    });
  });
};
