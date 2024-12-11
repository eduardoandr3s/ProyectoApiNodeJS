const express = require('express');
const movieCtrl = require('../controllers/movie.controller');
const router = express.Router();

router.get('/', movieCtrl.getMovies);
router.get('/movie/:id', movieCtrl.getMovie);
router.post('/', movieCtrl.addMovie);
router.post('/addMovies', movieCtrl.addMovies);
router.put('/:id', movieCtrl.updateMovie);
router.patch('/:id', movieCtrl.updateMovie);
router.delete('/:id',movieCtrl.deleteMovie);

router.get('/genres', movieCtrl.getGenres);

module.exports = router;