const express = require('express');

const {
    getAllMovie,
    addMovie,
    getMovieById
} = require('../controllers/movie-controller');

const movieRouter = express.Router();

movieRouter.get('/', getAllMovie);

movieRouter.post('/add', addMovie);

movieRouter.get('/:id', getMovieById);

module.exports = movieRouter;