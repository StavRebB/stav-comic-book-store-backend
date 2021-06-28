const mongoose = require('mongoose');
const Schema = mongoose.Schema

const storeDetailsSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    ZipCode: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('storedetails', storeDetailsSchema )