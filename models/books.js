const mongoose= require('mongoose');
// const dbConfig = require('../config/database')
const BookSchema= new mongoose.Schema({
    
        bookTitle: {
            type: String,
            required:true,
            unique:true
        },
        author: [{
            type: String,
            default:''
        }] ,
        description:  {
            type: String,
            default:''
        },
        isbn: {
            type: String,
            required:true
        },
        totalBooks:{
            type: Number,
            required:true
        },
        thumbnailImage:{
            type: String,
        },
        remainingBooks:{
        type:Number
        },
        categories:[{
            type:String
        }],
        averageRating:{
            type:Number
        },
        ratingsCount:{
            type:Number
        }
});

var bookModel= mongoose.model('book',BookSchema);

module.exports=bookModel;
