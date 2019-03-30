const moment = require('moment');
const LFG = require('./../models/LFG');

function getGameLfgPostings(gameId, userPlatforms) {
    return new Promise((resolve, reject) => {
        LFG.find({gameId: gameId, platform: {$in: userPlatforms}}, null, {sort: {postedAt: -1}})
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

function filterGameLfgPostings(gameId, filterObject) {
    let titleRegex = new RegExp(filterObject.title, "i")
    return new Promise((resolve, reject) => {
        LFG.find({gameId: gameId, platform: {$in: filterObject.platform}, title: titleRegex}, null, {sort: {postedAt: -1}})
        .populate('postedBy')
        .populate('players')
        .populate('platform')
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error)
        });
    })
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

function addPlayerToPosting(user, postingId) {
    return new Promise((resolve, reject) => {
        LFG.updateOne({_id: postingId},
            {$push: {players: user._id}})
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        })
    });
}

function removePlayerFromPosting(user, postingId) {
    return new Promise((resolve, reject) => {
        LFG.updateOne({_id: postingId},
            {$pull: {players: user._id}})
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        })
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

function getUserPostings(user) {
    console.log('Getting users postings');
    console.log(user);
    return new Promise((resolve, reject) => {
        
        LFG.findOne({postedBy: user._id})
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    getGameLfgPostings: getGameLfgPostings,
    filterGameLfgPostings: filterGameLfgPostings,
    createLfgPosting: createLfgPosting,
    deleteLfgPosting: deleteLfgPosting,
    addPlayerToPosting: addPlayerToPosting,
    removePlayerFromPosting: removePlayerFromPosting,
    getUserPostings: getUserPostings
}