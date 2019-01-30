const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GameSchema = new Schema({
    id: {
        type: Int16Array,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    popularity: {
        type: Float32Array,
        required: false
    },
    genres: {
        type: Array,
        required: false
    },
    releaseDate: {
        type: Date,
        required: false
    }
});

GameSchema.statics.createGame = function(game) {
    let newGame = {};
    for(let prop in game) {
        newGame[prop] = game[prop];
    }
    return new Game(newGame);
}

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;