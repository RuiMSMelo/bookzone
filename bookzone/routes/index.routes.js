const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guard')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.session)
  res.render('profile', { user: req.session.user })
})
module.exports = router;
