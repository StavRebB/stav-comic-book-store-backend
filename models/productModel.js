const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    ISBN10: {
        type: String,
        required: true
    },
    ISBN13: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Artist: {
        type: String,
        required: true
    },
    Pages: {
        type: Number,
        required: true
    },
    Dimensions: {
        type: String,
        required: true
    },
    Stars: {
        type: Number,
        required: true
    },
    Publisher: {
        type: Schema.ObjectId,
        required: true,
        ref: 'publishers'
    },
    Format: {
        type: Schema.ObjectId,
        required: true,
        ref: 'formats'
    },
    Language: {
        type: Schema.ObjectId,
        required: true,
        ref: 'languages'
    },
    Weight: {
        type: String,
        required: true
    },
    OriginalPrice: {
        type: Number,
        required: true
    },
    CurrentPrice: {
        type: Number,
    },
    PublicationDate: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Special: {
        type: Boolean,
        required: true
    },
    IsNew: {
        type: Boolean,
        required: true
    },
    Top: {
        type: Boolean,
        required: true
    },
    MainImage: {
        type: String,
    },
    Quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('products', productSchema )