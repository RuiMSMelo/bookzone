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
    try {
        const bookToUpdate = await Book.findById(req.params.bookId)
        console.log("book TO update: " ,bookToUpdate)
        res.render('books/update-book', {bookToUpdate})
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/update-book/:bookId', async (req, res, next) => {
    try {
        const {bookId} = req.params
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {new: true})
        console.log('updated book: ', updatedBook)
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

router.get('/read', async (req, res, next) => {
    try {
        const readBooks = await Book.find({ read: 'Yes' , createdBy: req.session.user.userId})
        res.render('books/read-books', {readBooks})
    } catch (error) {
        console.log(error)
    }
})

router.get('/unread', async (req, res, next) => {
    try {
        const unreadBooks = await Book.find({ read: 'No' , createdBy: req.session.user.userId})
        res.render('books/unread-books', {unreadBooks})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;