const mongoose = require('mongoose');
const Schema = mongoose.Schema

const publishersmSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    PublicationCity: {
        type: String,
        required: true
    },
    PublicationCountry: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('publishers', publishersmSchema )