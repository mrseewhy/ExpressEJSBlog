const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    author: {
        type: String,
        default: "Admin"
    },
    body:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('articles', articleSchema)