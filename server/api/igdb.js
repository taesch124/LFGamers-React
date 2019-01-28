const Dotenv = require('dotenv').config();
const IGDB = require('igdb-api-node').default;
const Keys = require('../config/keys');
const igdbClient = IGDB(Keys.igdb);
//const Game = require('../models/game.js');

// function searchGameByPhrase(searchPhrase, callback) {
//     igdbClient.games({
//         search: searchPhrase,
//         fields: '*',
//         limit: 5
//     }).then(response => {
//         let jsonArr = response.body;
//         let games = Game.getGamesFromIGDB(jsonArr);

//         if (typeof callback === 'function') callback(games);
//     }).catch(error => {
//         throw error;
//     });
// }

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
            'release_dates.date-gt': '2018-11-19',
            'release_dates.date-lt': '2020-01-01',
            'popularity-gt': '80'
        },
        limit: 5,
        fields: ['name', 
        'release_dates.date', 
        'rating',
        'popularity',
        'genres',
        'platforms']
    }).then(response => {
        let jsonArr = response.body;
        console.log(jsonArr);
        let games = [];
        for(let i = 0; i < jsonArr.length; i++) {
            
            let game = {
                name: jsonArr[i].name
            }
            games.push(game);
        }

        if (typeof callback === 'function') callback(games);
    }).catch(error => {
        throw error;
    });
}

function getGenres() {
    igdbClient.genres({
        fields: ['id', 'name'],
        limit: 50
    }).then(response => {
        console.log(response.body);
    }).catch(error => {
        console.log(error);
    });
}

module.exports = {
    // searchGame: searchGameByPhrase,
    // searchGameById: searchGameById,
    searchPopularGames: searchPopularGames,
    getGenres: getGenres
}