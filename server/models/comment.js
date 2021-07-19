import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    text: { type: String },
    date: { type: Date, default: new Date() }
});

const Comment = mongoose.model('comment', commentSchema);
export default Comment;