const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    track_title: {
        type: String,
        required: true
    },
    artist_name: {
        type: String,
        required: true 
    },
    album_title: {
        type: String,
        required: true, 
    },
    track_genres: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    track_date_created: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Track', trackSchema);