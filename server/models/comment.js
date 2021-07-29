import mongoose from 'mongoose';

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const commentSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    movie_id: { type: ObjectId },
    text: { type: String },
    date: { type: Date, default: new Date() }
});

const Comment = mongoose.model('comment', commentSchema);
export default Comment;