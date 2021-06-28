const mongoose = require('mongoose');
const Schema = mongoose.Schema

const rolesSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('roles', rolesSchema )