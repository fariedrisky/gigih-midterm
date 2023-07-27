const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoID: {
        required: true,
        type: String,
    },
    urlImageThumb: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('video', videoSchema);
