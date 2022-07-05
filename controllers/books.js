const Book = require('../models/Book')
const {Author} = require('../models/Author')


const getAllBooks = async (req,res)=>{
    const books = await Book.find();
    res.render('books',{title:"All Books",books})
}
const createBook = (req,res)=>{
    const {name,authorName,age, quantity, published,bestseller} = req.body
    const publishedDate = new Date(published)
    Author.findOne({name:authorName, age:age},(err,author)=>{
        if(err)
            console.log(err);
        else if(author){
            const book = new Book({
                name,
                published: publishedDate,
                quantity,
                author,
                bestseller: bestseller=='true'?true:false
            })
            book.save((err)=>{
                if(err) console.log(err);
                else{
                    return res.redirect('/books');
                }
            })
        }else{
            const newAuthor = new Author({
                name:authorName,
                age
            })
            newAuthor.save(err=>{
                if(err) console.log(err);
                else {
                    const book = new Book({
                      name,
                      published: publishedDate,
                      quantity,
                      author: newAuthor,
                      bestseller: bestseller=='true'?true:false,
                    });
                    book.save((err) => {
                      if (err) console.log(err);
                      else {
                          return  res.redirect('/books');
                      }
                    });
                }
            })
        }
    })
}
const getBook = async(req,res)=>{
    const book =await Book.findById(req.params.id)
    res.render('book',{
        title: book.name,
        book
    })
}
const updateBook =async (req,res)=>{
    console.log(req.params);
    const book = await Book.findOneAndUpdate({'_id':req.params.id},{...req.body, bestseller:req.body.bestseller=='true'?'true':'false'},{
        new:true,
        runValidators:true
    })
    res.redirect(`/books/${book._id}`)}
const deleteBook = async (req,res)=>{
    const book = await Book.findOneAndDelete({'_id':req.params.id})
    res.json({redirect:'/books'})
}

module.exports = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}