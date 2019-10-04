"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
    isEditting: {
        type: Boolean,
        default: false
    },
});
exports.default = mongoose.model('Activity', activitySchema);
//# sourceMappingURL=activity.js.map