const express = require('express');
const Genre = require('../models/genre');
const router = express.Router();

//all genres route
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i');
    }
    try{
        const genres = await Genre.find(searchOptions).limit(20);
        res.render('genres/index', {
            genres: genres, 
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

//display genres page route 
router.get('/new', (req, res) => {
    res.render('genres/new', {genres: new Genre() });
});

//create genre
router.post('/', async (req, res) => {
    const genre = new Genre({
        title: req.body.title
    })
    try{
        const newGenre = await genre.save()
        // res.redirect(`artists/${newArtist.id}`)
        res.redirect('genres');
    } catch {
        res.render('genres/new', {
            genre: genre, 
            errorMessage: 'Error creating genre'
        });
    }
});

module.exports = router;