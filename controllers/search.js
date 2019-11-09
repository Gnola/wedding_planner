const express = require('express');
const router = express.Router();
const Guest = require('../models/guests.js') // use guestSchema from /models/guests.js


// FIND
router.post('/', (req, res) => {
  Guest.findOne(
    // {},
    {name:req.body.name},
    (err, foundGuest) => {
      if (foundGuest === null) {
        res.redirect('/')
      } else {
        res.render(
          'guests/searchedguest.ejs',
          { guests: foundGuest}
        )
      }
    }
  )
})


// SHOW
router.get('/:id', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/searchedguest.ejs',
        { guests: foundGuest}
      )
    }
  )
})

// EDIT
router.get('/:id/edit', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/editsearch.ejs',
        {
          guests : foundGuest
        }
      )
    }
  )
})

// UPDATE
router.put('/:id', (req, res) => {
  Guest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedGuest) => {
      // res.send(updatedGuest)
      res.redirect('/search/' + updatedGuest.id)
    }
  )
})



module.exports = router
