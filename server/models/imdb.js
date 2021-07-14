import mongoose from 'mongoose';

const imdbSchema = mongoose.Schema({
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number }
});

const Imdb = mongoose.model('imdb', imdbSchema);
export default Imdb;