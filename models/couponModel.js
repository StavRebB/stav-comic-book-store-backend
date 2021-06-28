const mongoose = require('mongoose');
const Schema = mongoose.Schema

const couponSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Discount: {
        type: Number,
        required: true
    },
    IsActive: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('coupons', couponSchema )