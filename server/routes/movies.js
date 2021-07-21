import express from 'express';
import { getMovies, getMovie } from '../controllers/movies.js';
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', auth, getMovie);

export default router;