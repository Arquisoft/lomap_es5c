const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    idPhoto: {
        required: true,
        type: String
    },idUser: {
        required: true,
        type: String
    },
    idPlace: {
        required: true,
        type: String
    },
    photoURL: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Photo', dataSchema)