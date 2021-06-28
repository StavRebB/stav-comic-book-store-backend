const mongoose = require('mongoose');
const Schema = mongoose.Schema

const memberSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
    },
    Email: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean,
        required: true
    },
    Role: {
        type: Schema.ObjectId,
        required: true,
        ref: 'roles'
    },
    DateOfBirth: {
        type: Date,
    },
    Gender: {
        type: String,
    },
    PhoneNumber: {
        type: String,
    },
    ZipCode: {
        type: String,
    },
    Address: {
        type: String,
    },
    City: {
        type: String,
    },
    Country: {
        type: String,
    },
    Image: {
        type: String,
    }
})

module.exports = mongoose.model('members', memberSchema )