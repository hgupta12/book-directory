const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required:true
    }
})

Author = mongoose.model('Author',AuthorSchema)

module.exports = {
    AuthorSchema,
    Author
}