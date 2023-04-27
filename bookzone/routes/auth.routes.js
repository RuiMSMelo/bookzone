const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const bcryptjs = require('bcryptjs')
const saltRounds = 13

router.get('/signup', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/signup', async (req, res, next) => {
    try {
        const potentialUser = await User.findOne({username: req.body.username})

        if(!potentialUser) {
            const salt = bcryptjs.genSaltSync(saltRounds)
            const passwordHash = bcryptjs.hashSync(req.body.password, salt)
            const newUser = await User.create({username: req.body.username, passwordHash})
            console.log('NEW USER: ',newUser)

            res.redirect('/auth/login')
        }
        else {
            res.render('auth/signup', {errorMessage: 'Username already in use'})
        }


    } catch (error) {
        console.log(error)
    }
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!!user) {
            if (bcryptjs.compareSync(req.body.password, user.passwordHash)){
                 res.redirect('/profile')
            } else {
                res.render('auth/login', {errorMessage: 'Incorrect password'})
            } 
        } else {
            res.render('auth/login', {errorMessage: 'Incorrect username'})    
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;