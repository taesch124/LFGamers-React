const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Promise = require('bluebird');

const CommentSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    postedAt: {
        type: Date
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
        }
    ]
});

CommentSchema.statics.populateChildren = function(node) {
    let deferred = Promise.defer();
    let promises = []
    Comment
    .populate(node, {path: 'children', options: {sort: {'postedAt': -1}}})
    .then(function(node) {
        Comment
        .populate(node, {path: 'postedBy'})
        .then(function(node) {
            if(node.children) {
                node.children.map(e => {
                    promises.push(Comment.populateChildren(e));
                });
                Promise.all(promises)
                .then(function() {
                    deferred.resolve();
                })
            } else {
                return deferred.resolve();
            }
        })
        .catch(error => {
            return deferred.reject(error);
        })
        
    })
    .catch(error => {
        return deferred.reject(error);
    });

    return deferred.promise
    
  }

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;