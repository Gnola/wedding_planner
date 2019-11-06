const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js')

router.get('/new', (req, res) => { // USER clicked LOG IN on WELCOME SCREEN
  res.render('sessions/newsession.ejs') // LOG IN SCREEN
})

router.post('/', (req, res) => { // USER click LOG IN on /sessions/new
  // res.send('creating session')
  User.findOne( // find a user from the DB
    { username: req.body.username }, // find by their username
    (err, foundUser) => { // then...
      if (foundUser === null) { //
        res.redirect('/sessions/new')
      } else {
          const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
          if (doesPasswordMatch) {
            req.session.username = foundUser.username
            res.redirect('/guests')
            // res.send('password matches')
            // console.log(foundUser);
          } else {
            // res.send('nope')
            res.redirect('/sessions/new')
          }
      }
    }
  )
})

module.exports = router;
