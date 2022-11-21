const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    avaliation: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Reviews', ReviewSchema);