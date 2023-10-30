const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim:true
    },
    bookAuthor:{
        type:String,
        required:true,
        trim:true
    },
    summary:{
        type:String,
        required:true,
        trim:true,
        maxLength:200
    },
    publishDate:{
        type:Date,
        required:false
    },
    publisher:{
        type:String,
        required:false
    }
})

const BookModel = mongoose.model('Book',bookSchema)

module.exports = BookModel