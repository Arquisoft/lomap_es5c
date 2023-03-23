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
    commentBody: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Post', dataSchema)