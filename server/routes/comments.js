import express from 'express';
import { getComments, commentMovie } from '../controllers/comments.js';

const router = express.Router();

router.get('/:movieId', getComments);
router.post('/:id/commentMovie', commentMovie);

export default router;