import mongoose from 'mongoose';
import Award from './award.js';
import Comment from './comment.js';
import Imdb from './imdb.js';
import Tomatoe from './tomatoe.js';

const movieSchema = mongoose.Schema({
    plot: { type: String },
    poster: { type: String },
    genres: { type: [String], default: [] },
    runtime: { type: Number },
    cast: { type: [String], default: [] },
    num_mflix_comments: { type: Number },
    title: { type: String },
    fullplot: { type: String },
    countries: { type: [String], default: [] },
    released: { type: Date, default: new Date() },
    directors: { type: [String], default: [] },
    rated: { type: String },
    awards: { type: Award.schema },
    lastUpdated: { type: Date, default: new Date() },
    year: { type: Number },
    imdb: { type: Imdb.schema },
    type: { type: String },
    tomatoes: { type: Tomatoe.schema },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Movie = mongoose.model('movie', movieSchema);
export default Movie;