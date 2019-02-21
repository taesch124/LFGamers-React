const Thread = require('./../models/Thread');
const Comment = require('./../models/Comment');

function getThreadsByGame(gameId) {
    return new Promise((resolve, reject) => {
        Thread.find({gameId: gameId})
        .populate('originalComment')
        .populate('postedBy')
        .sort({postedAt: -1})
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function getCommentsByThread(threadId) {
    return new Promise((resolve, reject) => {
        Thread.findOne({_id: threadId})
        .populate('originalComment')
        .populate({path: 'originalComment',
                    populate: {path: 'postedBy'}
                })
        .then(results => {
            Comment
            .populateChildren(results.originalComment)
            .then(populatedOriginalComment => {
                //results.originalComment = populatedOriginalComment;
                resolve(results);
            }) 
            .catch(error => {
                console.error(error);
            });
            
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
            postedAt: new Date(),
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

function createComment(data) {
    return new Promise((resolve, reject) => {
        let parentId = data.parentId;
        let commentData = {
            postedBy: data.userId,
            postedAt: new Date(),
            text: data.text
        }
        
        let comment = new Comment(commentData);
        Comment.create(comment)
        .then(results => {
            Comment.update({_id: parentId}, {$push: {children: results._id}})
            .then(update => {
                resolve(update);
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
    getCommentsByThread: getCommentsByThread,
    getThreadsByGame: getThreadsByGame,
    createThread: createThread,
    createComment: createComment
}