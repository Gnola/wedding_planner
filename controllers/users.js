const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // set up encryption
const User = require('../models/users.js') // use userSchema from here

router.get('/new', (req, res) => {
  res.render('users/newuser.ejs') // when SIGN UP is clicked --> show NEWUSER.EJS
})

router.post('/', (req, res) => { // when REGISTER is clicked --> add new user to DB
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) // encrypt the password and set it = to req.body.password
  User.create( // create a user based off the userSchema in MODELS/USERS.JS
    req.body, // create an object
    (err, createdUser) => {
      req.session.username = createdUser.username // set the usernames = to eachother
      res.redirect('/guests') // send them to INDEX.EJS
    }
  )
})

module.exports = router
