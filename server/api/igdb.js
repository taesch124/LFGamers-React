const Dotenv = require('dotenv').config();
const IGDB = require('igdb-api-node').default;
const moment = require('moment');
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
        limit: 10
    }).then(response => {
        let jsonArr = response.body;

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

function searchPopularGames(callback) {
    let currentDate = new Date();
    let endDate = moment(currentDate).format('YYYY-MM-DD');
    let startDate = moment(currentDate).subtract(2, 'months').format('YYYY-MM-DD');
    console.log(startDate, endDate);
    igdbClient.games({
        filters: {
            'release_dates.date-gt': startDate,
            'release_dates.date-lt': endDate,
            'rating-gt': '75'
        },
        limit: 10,
        fields: fieldList
    }).then(response => {
        let jsonArr = response.body;

        console.log(jsonArr.genres, jsonArr.platforms);
        if (typeof callback === 'function') callback(jsonArr);
    }).catch(err => {
        console.log(err);
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
        if(!value) continue;
        fieldValues.push(value);
    }
    return fieldValues;
}

module.exports = {
    searchGame: searchGameByPhrase,
    // searchGameById: searchGameById,
    searchPopularGames: searchPopularGames,
    getGenres: getGenres,
    parseEnumeratedField: parseEnumeratedField
}