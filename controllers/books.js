const Book = require('../models/Book')
const {Author} = require('../models/Author')


const getAllBooks = async (req,res)=>{
    const books = await Book.find();
    console.log(books);
    res.status(200).json(books)
}
const createBook = (req,res)=>{
    // console.log(req.body);
    const {name,authorName,age, quantity, published} = req.body
    const publishedDate = new Date(published)
    Author.findOne({name:authorName, age:age},(err,author)=>{
        if(err)
            console.log(err);
        else if(author){
            console.log('Author already exists');
            const book = new Book({
                name,
                published: publishedDate,
                quantity,
                author
            })
            book.save((err)=>{
                if(err) console.log(err);
                else{
                    console.log('Book added');
                    return res.status(201).json(book);
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
                    console.log('Author added');
                    const book = new Book({
                      name,
                      published:publishedDate,
                      quantity,
                      author:newAuthor,
                    });
                    book.save((err) => {
                      if (err) console.log(err);
                      else {
                        console.log("Book added");
                          return  res.status(201).json(book);
                      }
                    });
                }
            })
        }
    })
}
const getBook = async(req,res)=>{
    const book =await Book.findById(req.params.id)
    res.status(200).json(book)
}
const updateBook =async (req,res)=>{
    const book = await Book.findOneAndUpdate({'_id':req.params.id},req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({msg:"Book updated!",book})}
const deleteBook = async (req,res)=>{
    const book = await Book.findOneAndDelete({'_id':req.params.id})
    res.status(200).json({msg:"Book deleted!",book})
}

module.exports = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}