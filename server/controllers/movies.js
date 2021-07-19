import Comment from '../models/comment.js';
import Movie from '../models/movie.js';

export const getMovies = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 12;
        const startIndex = (Number(page) - 1) * limit;
        const total = await Movie.countDocuments({});
        const movies = await Movie.find().sort({ _id: -1 }).limit(limit).skip(startIndex);
        res.json({ data: movies, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id).populate("comments");
        console.log('test');
        // const comments = await Comment.find({"movie_id": ObjectId("573a13faf29313caabdec1f8")} );
        // console.log(comments);
        res.status(200).json(movie);
    }
    catch(error) {
        res.status(404).json({ message: error.message });
    }
}