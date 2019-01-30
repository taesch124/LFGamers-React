const LocalStrategy = require('passport-local').Strategy;

// Load User model
const AuthController = require('../controllers/authController');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      let user = {username: username, password: password};
      AuthController.login(user, (results) => {
        if(results.success) {
          return done(null, results);
        } else {
          return done(null, false, results);
        }
      })
      
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
