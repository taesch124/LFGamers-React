const igdb = require('./../api/igdb');
const Game = require('./../models/Game');

const genres = require('./../config/utility').igdbGenres;
const platforms = require('./../config/utility').igdbPlatforms;

function getAndSaveGames() {
    return new Promise((resolve, reject) =>{
        igdb.searchPopularGames(results => {
            //console.log(results);
            let bulk = [];
            let response = [];

            for(let i = 0; i < results.length; i++) {
                createAndSaveGame(results[i], response, bulk);
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

        });
    });
    
}

function searchGameByTitle(searchPhrase) {
    return new Promise((resolve, reject) => {
        igdb.searchGame(searchPhrase, results => {
            if(results.error) {
                reject(results);
            }
    
            let bulk = [];
            let response = [];
            for(let i = 0; i < results.length; i++) {
                createAndSaveGame(results[i], response, bulk);
            }
            
            if(bulk.length === 0 ) {
                resolve();
            }
    
            Game.bulkWrite(bulk)
            .then(dbRresults => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
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
            "replacement": update,
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