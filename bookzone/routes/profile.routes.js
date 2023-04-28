const express = require('express')
const router = express.Router()
const Book = require('../models/Book.model')


router.get('/add-book', (req, res, next) => {
    res.render('books/add-book')
})

router.post('/add-book', async (req, res, next) => {
    try {        
            const creator = req.session.user.userId
            console.log(creator)
            const newBook = await Book.create({...req.body, createdBy: creator})
            console.log('NEW BOOK: ', newBook );
            res.redirect('/books/add-book')
      
    } catch (error) {
        console.log(error)
    }
})

router.get('/update-book', (req, res, next) => {
    res.render('books/update-book')
})

router.post('/update-book', async (req, res, next) => {
    try {        
            const newBook = await Book.findByIdAndUpdate({bookTitle: req.body.title, author: req.body.author}, {new: true})
            console.log('NEW BOOK: ', newBook )
            res.redirect('/books/add-book')
      
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;