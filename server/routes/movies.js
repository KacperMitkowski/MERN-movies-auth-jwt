import express from 'express';
import { getMovies, getMovie, createMovie, updateMovie, getMoviesBySearch } from '../controllers/movies.js';
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/', getMovies);
router.post('/', auth, createMovie);
router.patch('/:id', auth, updateMovie);
router.get('/search', getMoviesBySearch);
router.get('/:id', auth, getMovie);


export default router;