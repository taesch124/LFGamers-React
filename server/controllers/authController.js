const bcrypt = require('bcryptjs')

const User = require('./../models/User');

function login(user, callback) {
    User.findOne({username: user.username})
    .then(results => {
        console.log(results);
        if(results) {
            //use bcrypt to match password
            bcrypt.compare(user.password, results.password, (err, match) => {
                if(err) throw err;

                if(match) {
                    let response = {
                        success: true,
                        user: results
                    };
                    callback(response);
                }
                else {
                    let error = {
                        success: false,
                        message: 'Invalid password'
                    };
                    callback(error);
                }
            
                
            });
        } else {
            let error = {
                success: false,
                message: 'User not found'
            };
            callback(error);
        }
        
    })
    .catch(error => {
        throw error;
    });
    
}

function createAccount(user, callback) {
    User.findOne({username: user.username})
    .then(results => {
        if(results) {
            let error = {
                success: false,
                message: 'User already exists'
            };
            callback(error);
            return;
        }

        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;

                user.password = hash;
                User.create(user)
                .then(results => {
                    console.log(results);
                    let response = {
                        success: true,
                        results: results
                    }

                    callback(response);
                })
                .catch(error => {
                    throw error;
                });
            });
        });
    })
    .catch(error => {
        throw error;
    })

    
    
}

module.exports = {
    login: login,
    createAccount: createAccount
}