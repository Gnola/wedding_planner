const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // set up encryption
const User = require('../models/users.js') // use userSchema from here

router.get('/new', (req, res) => { // user clicked SIGN UP on WELCOME SCREEN
  res.render('users/newuser.ejs') // SIGN UP PAGE
})

router.post('/', (req, res) => { // when REGISTER is clicked on NEWUSER.EJS --> add new user to DB
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) // encrypt the password and set it = to req.body.password
  User.create( // create a user based off the Schema in MODELS/USERS.JS
    req.body, // create an object
    (err, createdUser) => { // then...
      req.session.username = createdUser.username // set the session username = to the new user username
      res.redirect('/guests') // send them to INDEX.EJS
    }
  )
}) // CREATES A NEW USER AND ADDS TO USERS COLLECTION

module.exports = router
