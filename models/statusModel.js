const mongoose = require('mongoose');
const Schema = mongoose.Schema

const statusSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('status', statusSchema )