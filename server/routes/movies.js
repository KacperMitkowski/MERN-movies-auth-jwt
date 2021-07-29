import express from 'express';
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie, getMoviesBySearch } from '../controllers/movies.js';
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/', getMovies);
router.get('/search', getMoviesBySearch);
router.get('/:id', getMovie);
router.post('/', auth, createMovie);
router.patch('/:id', auth, updateMovie);
router.delete('/:id', auth, deleteMovie);



export default router;