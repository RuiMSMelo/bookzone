const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Book = require('../models/Book.model')
const { isLoggedIn } = require('../middleware/route-guard')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {isLoggedIn: req.session.user});
});

router.get('/profile', isLoggedIn, async (req, res, next) => {
  try {
    const usersBooks = await Book.find(req.session.user.user.userId)
    console.log(req.session)
    res.render('profile', { user: req.session.user, usersBooks})
    console.log(usersBooks)

  } catch (error) {
    console.log(error)
  }
})

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});

module.exports = router;
