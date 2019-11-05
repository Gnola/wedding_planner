// DEPENDENCIES //
const express = require('express');
const app = express()
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection
require('dotenv').config()

// PORT //
const PORT = process.env.PORT // Allow use of Heroku's port or your own local port, depending on the environment
  // console.log(PORT);


// DATABASE //
const MONGODB_URI = process.env.MONGODB_URI
  // console.log(MONGODB_URI);

// CONNECT TO MONGO //
mongoose.connect(
  MONGODB_URI ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

// SUCCESS / ERROR //
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// MIDDLEWARE //
app.use(express.static('public')) // use publuc folder for static assets
app.use(express.urlencoded({extended:false})); // pupulate req.body with parsed info from forms
app.use(methodOverride('_method')); // be able to use DELETE and PUT routes


// ROUTES //
app.get('/', (req, res) => {
  res.send('Hello World')
})

// LISTENER //
app.listen(PORT, () => {
  console.log('listening...');
})
