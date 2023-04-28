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
            res.redirect('/profile')
      
    } catch (error) {
        console.log(error)
    }
})

router.get('/update-book/:bookId', async (req, res, next) => {
    const bookToUpdate = await Book.findById(req.params.bookId)
    console.log(bookToUpdate)
    res.render('books/update-book', req.body)
})



// ---------------------------MONDAY--------------------------------
// WE NEED TO FIND A WAY TO SEND THE ID IN THE PARAMS TO
// THE UPDATE PAGE SO IT KNOWS WHAT BOOK TO UPDATE IN MONGODB


router.post('/update-book/:bookId', async (req, res, next) => {
    try {
        const {bookId} = req.params
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {new: true})
        console.log('NEW BOOK: ', updatedBook )
        res.redirect('/profile')
      
    } catch (error) {
        console.log(error)
    }
})

router.get('/delete-book/:bookId', async (req, res, next) => {
    try {
        const {bookId} = req.params
        await Book.findByIdAndDelete(bookId)
        res.redirect("/profile")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;