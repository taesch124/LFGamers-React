const Game = require('./../models/Game');

function searchGameById(id) {
    return new Promise((resolve, reject) => {
        Game.findOne({id: id})
        .then(results => {
            console.log(results);
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