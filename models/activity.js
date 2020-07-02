const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const activitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Activity', activitySchema);
