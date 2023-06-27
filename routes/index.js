const express = require('express');
const Track = require('../models/tracks');
const router = express.Router();

router.get('/', async (req, res) => {
    let tracks;
    try{
        tracks = await Track.find().sort({createdAt: 'desc'}).limit(10).exec();
    }catch{
        tracks = [];
    }
    res.render('index', {tracks: tracks});
});

module.exports = router;