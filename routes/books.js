const express = require('express')
const router = express.Router()

const {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/books')

router.route('/')
.get(getAllBooks)
.post(createBook)

router.route('/:id')
.get(getBook)
.delete(deleteBook)

router.post('/edit/:id',updateBook)

module.exports = router