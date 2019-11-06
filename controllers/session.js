const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js')

router.get('/new', (req, res) => {
  res.render('sessions/newsession.ejs')
})

router.post('/', (req, res) => {
  // res.send('creating session')
  User.findOne(
    { username: req.body.username },
    (err, foundUser) => {
      console.log(req.session);
      console.log(foundUser);
      console.log(req.body);
      if (foundUser === null) {
        res.redirect('/sessions/new')
      } else {
        const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
        if (doesPasswordMatch) {
          res.body.username = foundUser.username
          res.redirect('/guests')
        } else {
          res.redirect('/sessions/new')
        }
      }
    }
  )
})

module.exports = router;
