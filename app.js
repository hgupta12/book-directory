const express = require('express')
require('dotenv').config()
const connectDB = require('./db/connect')
const booksRouter = require('./routes/books')
const Book  = require('./models/Book')

const app = express();

const PORT = process.env.PORT || 5000

// setting ejs as the view engine
app.set('view engine','ejs')

// adding middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/add',(req,res)=>{
    res.render('add-book')
})
app.get('/edit/:id',async (req,res)=>{
    const book = await Book.findById(req.params.id);
    console.log(book);
    res.render('edit-book',{
        title: "Edit the book",
        book
    })
})

app.use('/books',booksRouter)

// listening at PORT

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
    })
    }catch(err){
        console.log(err);
    }
}

start()

