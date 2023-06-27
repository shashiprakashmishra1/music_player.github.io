const express = require('express');
const Track = require('../models/tracks');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Genre = require('../models/genre');
const router = express.Router();

//all tracks route
router.get('/', async (req, res) =>{
    let query = Track.find();
    var spaces = /\s/g;
    if(req.query.track_title != null && req.query.track_title != '') {
        let tSearch = (req.query.track_title);
        trackSearch = tSearch.replace(spaces, "");
        query = query.regex('track_title', new RegExp(trackSearch, 'i'))
    }
    if(req.query.artist_name != null && req.query.artist_name != '') {
        let aSearch = (req.query.artist_name);
        artistSearch = aSearch.replace(spaces, "");
        query = query.regex('artist_name', new RegExp(artistSearch, 'i'))
    }
    if(req.query.track_genres != null && req.query.track_genres != '') {
        let gSearch = (req.query.track_genres);
        genreSearch = gSearch.replace(spaces, "");
        query = query.regex('track_genres', new RegExp(genreSearch, 'i'))
    }
    try{
        const tracks = await query.limit(20).exec();
        res.render('tracks/index', {
            tracks: tracks, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//new tracks route 
router.get('/new', async (req, res) => {
    renderNewPage(res, new Track());
});

//create track
router.post('/', async (req, res) => {
    const track = new Track({
        track_title: req.body.name,
        artist_name: req.body.artist,
        album_title: req.body.album,
        track_genres: req.body.genre, 
        createdAt: new Date(req.body.publishDate) 
    })

    try{
        const newTrack = await track.save();
        // res.redirect(`books/${newTrack.id}`);
        res.redirect(`tracks`);
    } catch{
        renderNewPage(res, track, true)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        res.render('tracks/show', {
            track: track,
        });
    } catch (err){
        console.log(err);
        res.redirect('/');
    }
});

async function renderNewPage(res, track, hasError = false){
    try{
        const artists = await Artist.find({});
        const albums = await Album.find({});
        const genres = await Genre.find({});
        const params = {
            artists: artists,
            albums, albums,
            genres, genres,
            track, track
        }
        if (hasError) params.errorMessage = 'Error creating track';
        res.render('tracks/new', params);
    } catch{
        res.redirect('/tracks');
    }
}

module.exports = router;