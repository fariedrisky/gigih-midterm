const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    videoID: {
        required: true,
        type: String
    },
    productID: {
        type: String,
        required: true
    },
    productLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema);
