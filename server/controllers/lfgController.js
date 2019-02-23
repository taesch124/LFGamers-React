const LFG = require('./../models/LFG');

function getGameLfgPostings(gameId) {
    return new Promise((resolve, reject) => {
        LFG.find({gameId: gameId}, {sort: {postedAt: -1}})
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error)
        });
    });
}

module.exports = {
    getGameLfgPostings: getGameLfgPostings
}