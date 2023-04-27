const express = require('express')
const router = express.Router()
// const User = require('../models/User.model')
// const bcryptjs = require('bcryptjs')
// const saltRounds = 13

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

module.exports = router;