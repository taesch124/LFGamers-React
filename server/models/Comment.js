const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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

CommentSchema.methods.populateChildren = function(node) {
    return node.populate('children').then(function(comment) {
        console.log(comment);
      return comment.children.length > 0 ? populateChildren(comment.children) : Promise.fulfill(comment);
    });
  }

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;