const express = require('express');
const Artist = require('../models/artist');
const Track = require('../models/tracks');
const router = express.Router();

//all artists route
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if (req.query.artist_name != null && req.query.artist_name !== '') {
        searchOptions.artist_name = new RegExp(req.query.artist_name, 'i');
    }
    try{
        const artists = await Artist.find(searchOptions).limit(20);
        res.render('artists/index', {
            artists: artists, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//display artist page route 
router.get('/new', (req, res) => {
    res.render('artists/new', {artists: new Artist() });
});

//create artist
router.post('/', async (req, res) => {
    const artist = new Artist({
        artist_name: req.body.artist_name
    })
    try{
        const newArtist = await artist.save()
        res.redirect(`artists/${newArtist.id}`)
    } catch {
        res.render('artists/new', {
            artist: artist, 
            errorMessage: 'Error creating artist'
        });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const artist = await Artist.findById(req.params.id);
        const tracks = await Track.find({artist: artist.id}).limit(15).exec();
        res.render('artists/show', {
            artist: artist,
            tracksByArtist: tracks
        });
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
});


module.exports = router;