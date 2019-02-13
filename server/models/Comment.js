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

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;