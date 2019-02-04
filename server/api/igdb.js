const Dotenv = require('dotenv').config();
const IGDB = require('igdb-api-node').default;
const Keys = require('../config/keys');
const igdbClient = IGDB(Keys.igdb);

const fieldList = require('./../config/utility').igdbGameFieldList;
//const Game = require('../models/game.js');

function searchGameByPhrase(searchPhrase, callback) {
    console.log('Search phrase: ' + searchPhrase);
    igdbClient.games({
        search: searchPhrase,
        fields: fieldList,
        limit: 5,
        expand: ['genres', 'platforms']
    }).then(response => {
        let jsonArr = response.body;
        console.log(response);
        console.log(jsonArr);
        if (typeof callback === 'function') callback(jsonArr);
    }).catch(err => {
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
        fields: fieldList,
        expand: ['genres', 'platforms']
    }).then(response => {
        let jsonArr = response.body;

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

module.exports = {
    searchGame: searchGameByPhrase,
    // searchGameById: searchGameById,
    searchPopularGames: searchPopularGames,
    getGenres: getGenres
}