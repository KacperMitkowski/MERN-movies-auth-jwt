import mongoose from 'mongoose';
import Comment from '../models/comment.js';
import User from '../models/user.js';

export const getComments = async (req, res) => {
    const { movieId } = req.params;

    try {
        Comment.find({ movie_id: new mongoose.Types.ObjectId(movieId) }, (err, comments) => {
            if (err) {
                throw new Error(err);
            }
            res.status(200).json(comments);
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const commentMovie = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const values = value.split(":");

        const name = values[0];
        const comment = values[1];
        const email = values[2];

        const newComment = new Comment({
            name,
            email,
            movie_id: new mongoose.Types.ObjectId(id),
            text: comment,
            date: new Date()
        });
        await newComment.save();

        Comment.find({ movie_id: new mongoose.Types.ObjectId(id) }, (err, comments) => {
            if (err) {
                throw new Error(err);
            }
            res.status(200).json(comments);
        });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}