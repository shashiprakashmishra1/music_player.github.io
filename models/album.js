const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    album_id: {
        type: Number,
        required: true
    },
    album_listens: {
        type: Number,
        required: true
    },
    album_tracks: {
        type: Number,
        required: true
    },
    album_title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Album', albumSchema);