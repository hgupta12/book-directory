const mongoose = require('mongoose')
const {AuthorSchema} = require('./Author')

const BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    author:{
        type:AuthorSchema,
        required: true
    },
    published:{
        type:Date,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    bestseller:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Book',BookSchema)