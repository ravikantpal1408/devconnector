const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema
const RecoverSchema = new Schema({
    userid: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    authtoken: {
        type: String,
        require: true
    },
    expire_at: {
        type: Date,
        default: Date.now,
        expires: 3600
    }

});

module.exports = Recover = mongoose.model('recover', RecoverSchema);