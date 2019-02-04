const Dotenv = require('dotenv').config();
const IGDB = require('igdb-api-node').default;
const Keys = require('../config/keys');
const igdbClient = IGDB(Keys.igdb);

const fieldList = require('./../config/utility').igdbGameFieldList;
const genres = require('./../config/utility').igdbGenres;
const platforms = require('./../config/utility').igdbPlatforms;
//const Game = require('../models/game.js');

function searchGameByPhrase(searchPhrase, callback) {
    console.log('Search phrase: ' + searchPhrase);
    igdbClient.games({
        search: searchPhrase,
        fields: fieldList,
        limit: 5
    }).then(response => {
        let jsonArr = response.body;

        console.log(jsonArr);
        if(jsonArr.genres && jsonArr.genres.length > 0) jsonArr.genres = parseEnumeratedField(jsonArr.genres, genres);
        if(jsonArr.platforms && jsonArr.platforms.length > 0) jsonArr.platforms = parseEnumeratedField(jsonArr.platforms, platforms);
        if (typeof callback === 'function') callback(jsonArr);
    }).catch(err => {
        console.error(err);
        let error = {
            error: true,
            message: err
        }
        if (typeof callback === 'function') callback(error);
    });
}

// function searchGameById(id, callback) {
//     igdbClient.games({
//         ids: [id],
//         fields: '*'
//     }).then(response => {
//         console.log(response.body);
//         let gameJson = response.body[0];
//         let game = new Game(gameJson);
//         if(typeof callback === 'function') callback(game);
//     }).catch(error => {
//         throw error;
//     });
// }

function searchPopularGames(callback) {
    igdbClient.games({
        filters: {
            'release_dates.date-gt': '2019-01-01',
            'release_dates.date-lt': '2019-02-01',
            'popularity-gt': '80'
        },
        limit: 5,
        fields: fieldList
    }).then(response => {
        let jsonArr = response.body;

        if(jsonArr.genres.length > 0) jsonArr.genres = parseEnumeratedField(jsonArr.genres, genres);
        if(jsonArr.platforms.length > 0) jsonArr.platforms = parseEnumeratedField(jsonArr.platforms, platforms);
        if (typeof callback === 'function') callback(jsonArr);
    }).catch(err => {
        let error = {
            error: true,
            message: err
        }
        if (typeof callback === 'function') callback(error);
    });
}

function getGenres() {
    igdbClient.genres({
        fields: ['id', 'name'],
        limit: 50
    }).then(response => {
        console.log(response.body);
    }).catch(err => {
        throw err;
    });
}

function parseEnumeratedField(json, data) {
    let fieldValues = [];
    if(!json) return fieldValues;
    for (let i = 0; i < json.length; i++) {
        let value = data[json[i]];
        fieldValues.push(value);
    }
    return fieldValues;
}

module.exports = {
    searchGame: searchGameByPhrase,
    // searchGameById: searchGameById,
    searchPopularGames: searchPopularGames,
    getGenres: getGenres
}