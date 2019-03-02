const igdb = require('./../api/igdb');
const Game = require('./../models/Game');

const genres = require('./../config/utility').igdbGenres;
const platforms = require('./../config/utility').igdbPlatforms;

function getAndSaveGames() {
    return new Promise((resolve, reject) =>{
        igdb.searchPopularGames(igdbResults => {
            //console.log(results);
            let ids = igdbResults.map(e => e.id)
            let bulk = [];
            let response = [];
            Game.find({
                'id': {$in: ids}
            })
            .then(results => {
                if(results.length === igdbResults.length) {
                    resolve(results);
                } else {
                    response = results;
                    let DBids = results.map(e => e.id);
                    let newGames = igdbResults.filter(e => {
                        return !DBids.includes(e.id);
                    });

                    for(let i = 0; i < newGames.length; i++) {
                        createAndSaveGame(newGames[i], response, bulk);
                    }
            
                    if(bulk.length === 0 ) {
                        resolve();
                    }
            
                    Game.bulkWrite(bulk)
                    .then(results => {
                        resolve(response);
                    })
                    .catch(err => {
                        reject(err);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });

        });
    });
    
}

function searchGameByTitle(searchPhrase) {
    return new Promise((resolve, reject) => {
        igdb.searchGame(searchPhrase, igdbResults => {
            if(igdbResults.error) {
                reject(igdbResults);
            }
    
            let ids = igdbResults.map(e => e.id);
            let bulk = [];
            let response = [];
            Game.find({
                'id': {$in: ids}
            })
            .then(results => {
                if(results.length === igdbResults.length) {
                    resolve(results);
                } else {
                    response = results;
                    let DBids = results.map(e => e.id);
                    let newGames = igdbResults.filter(e => {
                        return !DBids.includes(e.id);
                    });

                    for(let i = 0; i < newGames.length; i++) {
                        createAndSaveGame(newGames[i], response, bulk);
                    }
            
                    if(bulk.length === 0 ) {
                        resolve();
                    }
            
                    Game.bulkWrite(bulk)
                    .then(dbResults => {
                        resolve(response);
                    })
                    .catch(err => {
                        reject(err);
                    });
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    });
}

function getGames(callback) {
    Game.find().limit(10)
    .then(results => {
        if(typeof callback === 'function') callback(results);
    });
}

function createAndSaveGame(gameObj, response, bulk) {
    let game = Game.createGame(gameObj);
    if (game.genres) game.genres = igdb.parseEnumeratedField(game.genres, genres);
    if(game.platforms) game.platforms = igdb.parseEnumeratedField(game.platforms, platforms);

    const {_id, ...update} = game._doc;
    response.push(game._doc);

    let command = {
        updateOne: {
            "filter": {id: game.id},
            "replacement": game._doc,
            "upsert": true,
            "multi": true
        }
    }
    bulk.push(command);
}

module.exports = {
    getGames: getGames,
    getAndSaveGames: getAndSaveGames,
    searchGameByTitle: searchGameByTitle,
}