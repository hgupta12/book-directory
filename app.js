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

// use static files
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Book Directory'
    })
})

app.get('/add',(req,res)=>{
    res.render('add-book',{
        title:'Add a new book'
    })
})
app.get('/edit/:id',async (req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        if (book){
            return res.render("edit-book", {
              title: "Edit the book",
              book,
            });
        }
        res.render("404", {
          title: "Book Not Found",
          error: "No such book exists!",
          errorCode: 404,
        });
    } catch (error) {
        res.render("404", {
          title: "Error",
          error: "Something went wrong!",
          errorCode: 404,
        });
    }
    
})

app.use('/books',booksRouter)

app.use((req,res)=>{
    res.render('404',{
        title:'Error',
        error: 'Page not found!',
        errorCode: 404
    })
})

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

