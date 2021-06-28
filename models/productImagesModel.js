const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    ProductId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'products'
    },
    Name: {
        type: String,
        required: true
    },
    Caption: {
        type: String,
    }
})

module.exports = mongoose.model('productimages', imageSchema )