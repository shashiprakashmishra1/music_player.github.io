const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre_id: {
        type: Number,
        required: true
    },
    tracks: {
        type: Number, 
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Genre', genreSchema);