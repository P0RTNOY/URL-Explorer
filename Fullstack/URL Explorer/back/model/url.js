const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    htmlContent: {
        type: String,
        required: true
    },
    nestedUrls: []
});
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
