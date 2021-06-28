const mongoose = require('mongoose');
const Schema = mongoose.Schema

const deliverySchema = new Schema({
    id:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Duration: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('deliveries', deliverySchema )