const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    MemberId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'members'
    },
    PostId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'blogposts'
    },
    DateOfWriting: {
        type: Date,
        required: true
    },
    Content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comments', commentSchema )