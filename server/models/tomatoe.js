import mongoose from 'mongoose';
import Viewer from './viewer.js'

const TomatoeSchema = mongoose.Schema({
    viewer: { type: Viewer.schema },
    lastUpdated: { type: Date, default: new Date() },
});

const Tomatoe = mongoose.model('tomatoe', TomatoeSchema);
export default Tomatoe;