const User = require('./../models/User');

function login(user, callback) {
    User.findOne({username: user.username})
    .then(results => {
        console.log(results);
        if(results) {
            //use bcrypt to match password
            let response = {
                success: true,
                user: results
            }
            callback(response);
        } else {
            let error = {
                success: false,
                message: 'User not found'
            }
            callback(error);
        }
        
    })
    .catch(error => {
        throw error;
    });
    
}

module.exports = {
    login: login
}