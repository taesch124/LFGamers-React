const igdb = require('./../api/igdb');
const Game = require('./../models/Game');

const genres = require('./../config/utility').igdbGenres;
const platforms = require('./../config/utility').igdbPlatforms;

function getAndSaveGames(callback) {
    igdb.searchPopularGames(results => {
        //console.log(results);
        let bulk = [];
        let response = [];
        for(let i = 0; i < results.length; i++) {
            let game = Game.createGame(results[i]);
            if (game.genres) game.genres = igdb.parseEnumeratedField(game.genres, genres);
            if(game.platforms) game.platforms = igdb.parseEnumeratedField(game.platforms, platforms);
            const {_id, ...update} = game._doc;
            response.push(update);
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

        if(bulk.length === 0 ) {
            callback();
            return;
        }

        Game.bulkWrite(bulk)
        .then(results => {
            if (typeof callback === 'function') callback(response);
        })
        .catch(err => {
            throw err;
        });
    });
}

function searchGameByTitle(searchPhrase, callback) {
    igdb.searchGame(searchPhrase, results => {
        if(results.error) {
            if (typeof callback === 'function') callback(results);
            return;
        }

        let bulk = [];
        let response = [];
        for(let i = 0; i < results.length; i++) {
            let game = Game.createGame(results[i]);
            const {_id, ...update} = game._doc;
            response.push(update);
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
        
        if(bulk.length === 0 ) {
            callback();
            return;
        }

        Game.bulkWrite(bulk)
        .then(dbRresults => {
            if (typeof callback === 'function') callback(response);
        })
        .catch(err => {
            throw err;
        });
    });
}

function getGames(callback) {
    Game.find().limit(10)
    .then(results => {
        if(typeof callback === 'function') callback(results);
    });
}

module.exports = {
    getGames: getGames,
    getAndSaveGames: getAndSaveGames,
    searchGameByTitle: searchGameByTitle,
}