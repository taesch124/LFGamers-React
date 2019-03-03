const moment = require('moment');
const LFG = require('./../models/LFG');

function getGameLfgPostings(gameId) {
    return new Promise((resolve, reject) => {
        LFG.find({gameId: gameId}, null, {sort: {postedAt: -1}})
        .populate('postedBy')
        .populate('players')
        .populate('platform')
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error)
        });
    });
}

function createLfgPosting(data) {
    return new Promise((resolve, reject) => {
        let startDate = moment(`${data.startDate} ${data.startTime}`, 'DD MMMM, YYYY HH:mm A').toDate();
        let endDate = null;
        if(data.endDate && data.endTime) {
            endDate = moment(`${data.endDate} ${data.endTime}`, 'DD MMMM, YYYY HH:mm A').toDate();
        }
        else if(data.endDate) {
            endDate = moment(`${data.endDate}`, 'DD MMMM, YYYY').toDate();
        }

        let posting = {
            postedBy: data.userId,
            postedAt: new Date(),
            gameId: data.gameId,
            title: data.title,
            description:data.description,
            playerLimit: data.playerLimit,
            platform: data.platform,
            players: [data.userId],
            startDate: startDate,
            endDate: endDate
        };

        let lfg = new LFG(posting);
        LFG.create(lfg)
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject.error()
        });
    });
}

function deleteLfgPosting(_id) {
    return new Promise((resolve, reject) => {
        LFG.deleteOne({_id: _id})
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        });
    })
}

module.exports = {
    getGameLfgPostings: getGameLfgPostings,
    createLfgPosting: createLfgPosting,
    deleteLfgPosting: deleteLfgPosting
}