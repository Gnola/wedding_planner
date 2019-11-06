const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js')

router.get('/new', (req, res) => { // user clicked LOG IN on WELCOME SCREEN
  res.render('sessions/newsession.ejs') // LOG IN PAGE
})

router.post('/', (req, res) => { // user clicked LOG IN on LOG IN PAGE
  User.findOne( // find a user from the DB...
    { username: req.body.username }, // by their username
    (err, foundUser) => { // then...
      if (foundUser === null) { // if there is NOT a matching USER
        res.redirect('/sessions/new') // keep them at the LOG IN PAGE
      } else { // otherwise
          const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password) // check to see if the PWs match
          if (doesPasswordMatch) { // if they DO MATCH
            req.session.username = foundUser.username // set the session username as the username of the user logging in
            res.redirect('/guests') // then sent them to the home page
          } else { // if they DONT MATCH
            res.redirect('/sessions/new') // keep them at the LOG IN PAGE
          }
      }
    }
  )
}) // USER CAN LOG IN

module.exports = router;
