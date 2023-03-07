const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    idComment: {
        required: true,
        type: String
    },
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