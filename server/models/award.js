import mongoose from 'mongoose';

const awardSchema = mongoose.Schema({
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
});

const Award = mongoose.model('award', awardSchema);
export default Award;