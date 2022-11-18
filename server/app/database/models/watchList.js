const mongoose = require('mongoose');

const WatchListSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model('Watch_list', WatchListSchema);