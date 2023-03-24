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
    scoreValue:{
        required: true,
        type: mongoose.Types.Decimal128
    }
})

module.exports = mongoose.model('Score', dataSchema)