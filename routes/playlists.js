const express = require('express');
const Playlist = require('../models/playlist');
const tracks = require('../models/tracks');
const Track = require('../models/tracks');
const router = express.Router();

//all playlists route
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try{
        const playlists = await Playlist.find(searchOptions).limit(25);
        res.render('playlists/index', {
            playlists: playlists, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//display playlists page route 
router.get('/new', (req, res) => {
    renderNewPage(res, new Playlist());
});

//create playlist
router.post('/', async (req, res) => {
    const playlist = new Playlist({
        name: req.body.name,
        description: req.body.description,
        privacy: req.body.privacy
    });
    try{
        const newPlaylist = await playlist.save()
        res.redirect(`playlists/${newPlaylist.id}`);
    } catch {
        renderNewPage(res, playlist, true);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        res.render('playlists/show', {
            playlist: playlist,
        });
    } catch (err){
        console.log(err);
        res.redirect('/');
    }
});

router.get('/:id/edit', async (req, res) => {
    try{
        const playlist = Playlist.findById(req.params.id);
        res.render('playlists/edit', {playlist: playlist});
    } catch {
        res.redirect('/playlists');
    }
});

router.put('/:id/edit', async (req, res) => {
    let playlist
    try {
        playlist = await Playlist.findById(req.params.id)
        playlist.name = req.body.name
        playlist.description = req.body.description
        playlist.privacy = req.body.privacy
        await playlist.save()
        res.redirect(`/playlists/${playlist.id}`)
    } catch {
        if(playlist == null){
            res.redirect('/')
        }else{
            res.render('playlists/edit', {
                playlist: playlist,
                errorMessage: 'Error editing playlist'
            })
        }
    }
});

router.get('/:id/review', async (req, res) => {
    try{
        const playlist = await Playlist.findById(req.params.id);
        res.render('playlists/review', {playlist: playlist});
    } catch {
        res.redirect('/playlists');
    }
});

router.put('/:id/review', async (req, res) => {
    let playlist
    try {
        playlist = await Playlist.findById(req.params.id)
        playlist.comment = req.body.comment
        playlist.rating = req.body.rating
        await playlist.save()
        res.redirect(`/playlists/${playlist.id}`)
    } catch {
        if(playlist == null){
            res.redirect('/')
        }else{
            res.render('playlists/edit', {
                playlist: playlist,
                errorMessage: 'Error creating review'
            })
        }
    }
});

router.get('/:id/addTracks', async (req, res) => {
    try{
        const playlist = await Playlist.findById(req.params.id);
        res.render('playlists/addTracks', {playlist: playlist});
    } catch {
        res.redirect('/playlists');
    }
});

router.put('/:id/addTracks', async (req, res) => {
    let trackName = req.body.tracks
    let playlist
    try {
        playlist = await Playlist.findById(req.params.id)
        addTracks(trackName, playlist);
        res.redirect(`/playlists/${playlist.id}`)
    } catch {
        if(playlist == null){
            res.redirect('/')
        }else{
            res.render('playlists/edit', {
                playlist: playlist,
                errorMessage: 'Error creating review'
            })
        }
    }
});


async function addTracks(trackName, playlist){
    const track = await Track.findOne({track_title: trackName});
    if (track){
        playlist.tracks.push(track);
        await playlist.save()
    } else {}
}


router.delete('/:id', async (req, res) => {
    let playlist
    try{
        playlist = await Playlist.findById(req.params.id);
        await playlist.remove();
        res.redirect('/playlists');
    } catch {
        if ( playlist == null ) {
            res.redirect('/')
        } else{
            res.redirect(`/playlists/${playlist.id}`)
        }
    }
});

async function renderNewPage(res, playlist, hasError = false) {
    try{
        const tracks = await Track.find({});
        const params = {
            tracks: tracks,
            playlist, playlist
        }
        if (hasError) params.errorMessage = 'Error creating playlist';
        res.render('playlists/new', params);
    }catch{
        res.redirect('/playlists');
    }
}

module.exports = router;