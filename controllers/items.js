const express = require('express');
const router = express.Router();
const Item = require('../models/items.js') // use guestSchema from /models/guests.js

// NEW ITEM
router.get('/new', (req, res) => { // clicked CREATE NEW from HOMEPAGE
  res.render('items/newitem.ejs') // NEW GUEST PAGE
})

// CREATE ITEM
router.post('/', (req, res) => {
  Item.create( // create a GUEST using the schema from MODELS/GUESTS.JS
    req.body, // get info from req.body
    (err, createdItem) => { // then..
      res.redirect('/items') // send them back to the HOMEPAGE
    }
  )
})

// BUDGET HOME
router.get('/', (req, res) => {
  Item.find(
    {},
    (err, allItems) => {
      res.render(
        'items/budget.ejs',
        {
          items: allItems,
        }
      )
    }
  )
})

// SHOW ITEM
router.get('/:id', (req, res) => {
  Item.findById(
    req.params.id,
    (err, foundItem) => {
      res.render(
        'items/showitems.ejs',
        { items : foundItem}
      )
    }
  )
})


// DELETE ITEM
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(
    req.params.id,
    (err, data) => {
      res.redirect('/items')
    }
  )
})

// EDIT ITEM
router.get('/:id/edit', (req, res) => {
  Item.findById(
    req.params.id,
    (err, foundItem) => {
      res.render(
        'items/edititem.ejs',
        {
          items : foundItem
        }
      )
    }
  )
})

// UPDATE ITEM
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedItem) => {
      // res.send(updatedGuest)
      res.redirect('/items/' + updatedItem.id)
    }
  )
})

module.exports = router
