const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LFGSchema = new Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    playerLimit: {
        type: Number,
        required: true
    },
    platform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    postedAt: {
        type: Date,
        required: true
    }
});

const LFG = mongoose.model('LFG', LFGSchema);
module.exports = LFG;