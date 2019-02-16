const Thread = require('./../models/Thread');
const Comment = require('./../models/Comment');

function getThreadsByGame(gameId) {
    return new Promise((resolve, reject) => {
        Thread.find({gameId: gameId})
        .populate('originalComment')
        .populate('postedBy')
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function createThread(data) {
    return new Promise((resolve, reject) => {
        let commentData = {
            postedBy: data.userId,
            title: data.title,
            text: data.text,
        };
        let comment = new Comment(commentData);
        
        let threadData = {
            gameId: data.gameId,
            postedBy: data.userId,
            postedAt: new Date(),
            originalComment: comment._id,
        };
        let thread = new Thread(threadData);

        console.log(comment);
        console.log(thread);
        let results = {};
        Comment.create(comment)
        .then(commentResults => {
            results.commentResults = commentResults;
            Thread.create(thread)
            .then(threadResults => {
                results.threadResults = threadResults;
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
            
        })
        .catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    getThreadsByGame: getThreadsByGame,
    createThread: createThread
}