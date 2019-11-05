// DEPENDENCIES //
const express = require('express');
const app = express()
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection
require('dotenv').config()

const Guest = require('./models/guests.js');

// PORT //
const PORT = process.env.PORT // Allow use of Heroku's port or your own local port, depending on the environment

// DATABASE //
const MONGODB_URI = process.env.MONGODB_URI

// SUCCESS / ERROR //
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// MIDDLEWARE //
app.use(express.static('public')) // use publuc folder for static assets
app.use(express.urlencoded({extended:false})); // pupulate req.body with parsed info from forms
app.use(methodOverride('_method')); // be able to use DELETE and PUT routes




// ROUTES ON SERVER //
app.get('/', (req, res) => {
  res.render('welcome.ejs')
})





////////////////// ROUTES TO MOVE ///////////////////////

// NEW GUEST
app.get('/guests/new', (req, res) => {
  // res.send('new')
  res.render('guests/newguest.ejs')
})

// CREATE (POST) GUEST
app.post('/guests/', (req, res) => {
  Guest.create(
    req.body,
    (err, createdGuest) => {
      res.redirect('/guests')
    }
  )
  console.log(req.body);
})


// INDEX (HOME)
app.get('/guests/', (req, res) => {
  Guest.find(
    {},
    (err, allGuests) => {
      res.render(
        'guests/index.ejs',
        { guests: allGuests }
      )
    }
  )
})


// SHOW GUEST
app.get('/guests/:id', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/showguest.ejs',
        { guests: foundGuest}
      )
    }
  )
})


// DELETE GUEST
app.delete('/guests/:id', (req, res) => {
  Guest.findByIdAndRemove(
    req.params.id,
    (err, data) => {
      res.redirect('/guests')
    }
  )
})

// EDIT GUEST
app.get('/guests/:id/edit', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/editguest.ejs',
        {
          guests : foundGuest
        }
      )
    }
  )
})

// UPDATE GUEST
app.put('/guests/:id', (req, res) => {
  Guest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedGuest) => {
      // res.send(updatedGuest)
      res.redirect('/guests/' + updatedGuest.id)
    }
  )
})





// CONNECT TO MONGO //
mongoose.connect(
  MONGODB_URI ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });


// LISTENER //
app.listen(PORT, () => {
  console.log('listening...');
})
