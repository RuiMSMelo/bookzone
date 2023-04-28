const express = require('express')
const router = express.Router()
const Book = require('../models/Book.model')


router.get('/add-book', (req, res, next) => {
    res.render('books/add-book')
})

router.get('/update-book', (req, res, next) => {
    res.render('books/update-book')
})


module.exports = router;