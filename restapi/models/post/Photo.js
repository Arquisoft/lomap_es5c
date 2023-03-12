const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    idUser: {
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