const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    OrderNum: {
        type: String,
        required: true
    },
    OrderDate: {
        type: Date,
        required: true
    },
    PayerName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    RecieverName: {
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
    Payment: {
        type: String,
        required: true
    },
    Products: {
        type: [
            {
                id: {
                    type: Schema.ObjectId,
                    required: true,
                    ref: 'products'
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Sum: {
        type: Number,
        required: true
    },
    Status: {
        type: Schema.ObjectId,
        ref: 'status'
    },
    Delivery: {
        type: Schema.ObjectId,
        required: true,
        ref: 'deliveries'
    },
    Coupon: {
        type: Schema.ObjectId,
        ref:'coupons'
    },
    Refund: {
        type: Boolean,
        required: true
    },
    Notes:{
        type: String,
    }
})

module.exports = mongoose.model('orders', orderSchema )