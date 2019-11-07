const express = require('express');
const router = express.Router();
const Guest = require('../models/guests.js') // use guestSchema from /models/guests.js


// NEED TO FIGURE OUT HOW TO DO SOMETHING IF SEARCH DOESNT MATCH
// FIND
router.post('/', (req, res) => {
  // res.send('hey there')
  Guest.findOne(
    // {},
    {name:req.body.name},
    (err, foundGuest) => {
      console.log(req.body);
      res.render(
        'guests/foundguest.ejs',
        { guests: foundGuest}
      )
    }
  )
})


// SHOW
router.get('/:id', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/foundguest.ejs',
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
        'guests/searchedit.ejs',
        {
          guests : foundGuest
        }
      )
    }
  )
})

// UPDATE
router.put('/:id', (req, res) => {
  console.log(req.body);
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
