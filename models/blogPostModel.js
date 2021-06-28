const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogPostSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    MemberId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'members'
    },
    DateOfWriting: {
        type: Date,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    Image: {
        type: String,
    },
    Video: {
        type: String,
    },
})

module.exports = mongoose.model('blogposts', blogPostSchema )