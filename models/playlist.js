const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tracks: {
        type: Array,
        required: false,
    },
    lastModified: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    privacy: {
        type: String,
        required: true,
        default: "private"
    }, 
    comment: {
        type: String,
        required: false
    }, 
    rating: {
        type: Number, 
        required: false
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);