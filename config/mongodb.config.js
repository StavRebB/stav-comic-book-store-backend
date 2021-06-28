const mongoose = require("mongoose")
require('dotenv').config()

const db = mongoose.connect(`mongodb+srv://store:${process.env.MONGO_PASS}@cluster0.sctec.mongodb.net/${process.env.MONGODATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on("connected",()=>console.log("MongoDB connected"))
mongoose.connection.on("error",(err)=>console.log(err))

module.exports = db;