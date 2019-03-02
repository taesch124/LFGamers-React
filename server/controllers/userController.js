const User = require('./../models/User');

function getUserGameFavorites(user) {
    return new Promise((resolve, reject) => {
        User.findOne(
            {_id: user._id},
        )
        .populate({path: 'gameFavorites', model: 'Game'})
        .then(results => {
            resolve(results.gameFavorites);
        })
        .catch(error => {
            reject(error);
        });
    });
}
function addGameToFavorites(user, gameId) {
    return new Promise((resolve, reject) => {
        User.updateOne(
            {
                _id: user._id, 
                gameFavorites: {$nin: [gameId]} 
            },
            {$push: {gameFavorites: gameId}}
        )
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function removeGameFromFavorites(user, gameId) {
    return new Promise((resolve, reject) => {
        User.updateOne(
            {_id: user._id},
            {$pull: {gameFavorites: gameId}}
        )
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        });
    })
}

function getAccounts(user) {
    return new Promise((resolve, reject) => {
        User.findOne({_id: user._id})
        .populate('accounts.platform')
        .then(results => {
            console.log(results);
            resolve(results.accounts);
        })
        .catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    getUserGameFavorites: getUserGameFavorites,
    addGameToFavorites: addGameToFavorites,
    removeGameFromFavorites: removeGameFromFavorites,
    getAccounts
}