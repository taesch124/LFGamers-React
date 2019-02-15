const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ThreadSchema = new Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    postedAt: {
        type: Date,
        required: true
    },
    originalComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

const Thread = mongoose.model('Thread', ThreadSchema);
module.exports = Thread;