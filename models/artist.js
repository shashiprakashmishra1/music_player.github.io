const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artist_id: {
        type: String, 
        required: false
    },
    artist_location: {
        type: String,
        required: false
    },
    artist_name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Artist', artistSchema);