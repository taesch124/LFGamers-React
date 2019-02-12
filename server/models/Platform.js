const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlatformSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
});

const Platform = mongoose.model('Platform', PlatformSchema);
module.exports = Platform;