const mongoose = require('mongoose');
const Schema = mongoose.Schema

const formatSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('formats', formatSchema )