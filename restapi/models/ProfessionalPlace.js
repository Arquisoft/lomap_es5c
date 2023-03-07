const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    idProfPlace: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    latitude: {
        required: true,
        type: Number
    },
    longitude: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Place', dataSchema)