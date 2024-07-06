//model/model.js
const mongoose = require("mongoose");


const crisisSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});

const Crisis = mongoose.model('Crisis', crisisSchema);

module.exports = Crisis;

