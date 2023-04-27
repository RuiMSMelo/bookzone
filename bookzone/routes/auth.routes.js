const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
// const bcryptjs = require('bcryptjs')
// const saltRounds = 13

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
    try {
        const newUser = await User.create({ username: req.body.username })
        console.log('this is the new user', newUser)
    } catch (error) {
        console.log(error)
    }
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

module.exports = router;