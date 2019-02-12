const Platform = require('./../models/Platform');

function getAllPlatforms() {
    return new Promise((resolve, reject) => {
        Platform.find({})
        .then(results => {
            resolve(results);
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getAllPlatforms: getAllPlatforms
}