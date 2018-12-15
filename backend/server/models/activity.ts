import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const activitySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    isEditting: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Activity', activitySchema);
