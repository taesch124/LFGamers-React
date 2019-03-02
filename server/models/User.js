const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // validate: [
        //     function(input) {
        //       return input.length >= 6;
        //     },
        //     "Password should be at least 6 characters."
        //   ]
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    accounts: [
        {
            platform: {
                type: String
            },
            account: {
                type: String
            }
        }
    ],
    gameFavorites: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Game'
        }
    ]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;