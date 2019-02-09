const Game = require('./../models/Game');

function searchGameById(id) {
    return new Promise((resolve, reject) => {
        Game.findOne({_id: id})
        .then(results => {
            resolve(results);
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    searchGameById: searchGameById
}