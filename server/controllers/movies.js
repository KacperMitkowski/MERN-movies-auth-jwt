import Comment from '../models/comment.js';
import Movie from '../models/movie.js';
import mongoose from 'mongoose';
import Award from '../models/award.js';
import Imdb from '../models/imdb.js';
import Tomatoe from '../models/tomatoe.js';

export const getMovies = async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 12;
        const startIndex = (Number(page) - 1) * limit;
        const total = await Movie.countDocuments({});
        const movies = await Movie.find().sort({ _id: -1 }).limit(limit).skip(startIndex);
        res.status(200).json({ data: movies, currentPage: Number(page), numberOfPages: Math.ceil(total / limit) });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id);
        movie.comments = await Comment.find({ "movie_id": new mongoose.Types.ObjectId(id) });
        res.status(200).json(movie);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMoviesBySearch = async (req, res) => {
    const { searchQuery, genres } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        let movies = [];
        if (genres) {
            if (searchQuery === 'none') {
                movies = await Movie.find({ genres: { $all: genres.split(',') } });
            }
            else {
                movies = await Movie.find({ $and: [{ title }, { genres: { $all: genres.split(',') } }] });
            }
        }
        else {
            movies = await Movie.find({ title });
        }

        res.json({ data: movies });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMovie = async (req, res) => {
    const movie = req.body;

    try {
        if (movie?.title?.trim()?.length === 0) return res.status(200).json({ error: "No title given" });
        if (movie?.fullPlot?.trim()?.length === 0) return res.status(200).json({ error: "No plot given" });

        const newAwards = new Award({ wins: movie.awards, nomination: 0, text: `${movie.awards} win.` });
        const newImdb = new Imdb({ rating: 0, votes: 0, id: Math.random() })
        const newMovie = new Movie({
            plot: movie.fullPlot.substring(0, 100),
            genres: movie.selectedGenres,
            runtime: movie.runtime,
            rated: "NOT RATED",
            cast: movie.selectedActors,
            poster: movie.file,
            title: movie.title,
            fullplot: movie.fullPlot,
            languages: movie.selectedLanguages,
            released: movie.releasedDate,
            directors: movie.selectedDirectors,
            writers: movie.selectedWriters,
            awards: newAwards,
            lastupdated: new Date().toISOString(),
            year: movie.year,
            imdb: newImdb,
            countries: movie.selectedCountries,
            type: movie.type,
            tomatoes: new Tomatoe(),
            userId: movie.userId
        });
        await newMovie.save();
        res.status(201).json(newMovie);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, year, releasedDate, selectedLanguages, selectedActors, selectedGenres, selectedCountries, fullPlot, selectedDirectors, selectedWriters, runtime, type, awards, file, userId } = req.body;

    try {
        if (title?.trim()?.length === 0) return res.status(200).json({ error: "No title given" });
        if (fullPlot?.trim()?.length === 0) return res.status(200).json({ error: "No plot given" });

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

        const newAwards = new Award({ wins: awards, nomination: 0, text: `${awards} win.` });
        const newImdb = new Imdb({ rating: 0, votes: 0, id: Math.random() })
        const updatedMovie = { 
            plot: fullPlot.substring(0, 100),
            genres: selectedGenres,
            runtime: runtime,
            rated: "NOT RATED",
            cast: selectedActors,
            poster: file,
            title: title,
            fullplot: fullPlot,
            languages: selectedLanguages,
            released: releasedDate,
            directors: selectedDirectors,
            writers: selectedWriters,
            awards: newAwards,
            lastupdated: new Date().toISOString(),
            year: year,
            imdb: newImdb,
            countries: selectedCountries,
            type: type,
            tomatoes: new Tomatoe(),
            _id: id
        };

        await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });
        res.status(201).json(updatedMovie);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);
    
        await Movie.findByIdAndRemove(id);
    
        res.status(201).json({ message: "Movie deleted successfully." });
    }
    catch(error) {
        res.status(409).json({ message: error.message });
    }
}