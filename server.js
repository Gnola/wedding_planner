// DEPENDENCIES //
const express = require('express'); // use express
const app = express() // use express
const methodOverride = require('method-override'); // use methodOverride
const mongoose = require('mongoose'); // use mongoose
const session = require('express-session'); // use sessions / cookies
require('dotenv').config() // use dotenv

const PORT = process.env.PORT // PORT - Allow use of Heroku's port or your own local port, depending on the environment
const MONGODB_URI = process.env.MONGODB_URI // DATABASE

// // SUCCESS / ERROR //
// const db = mongoose.connection
// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
// db.on('disconnected', () => console.log('mongo disconnected'));


// MIDDLEWARE //
app.use(express.static('public')) // use public folder for static assets == CSS
app.use(express.urlencoded({extended:false})); // populate req.body with parsed info from forms
app.use(methodOverride('_method')); // be able to use DELETE and PUT routes
app.use(session({ secret: 'randomstring',resave: false, saveUninitialized:false})) // set up session cookies


// CONTROLLER CONNECTIONS //
const guestsController = require('./controllers/guests.js'); // GUESTS
app.use('/guests', guestsController)

const userController = require('./controllers/users.js') // USERS
app.use('/users', userController)

const sessionController = require('./controllers/session.js') // USERS
app.use('/sessions', sessionController)



// ROUTES //
app.get('/', (req, res) => { // WELCOME.EJS
  res.render('welcome.ejs') // Sign up or Log in
})

app.get('/set', (req, res) => { // SET UP COOKIE
  req.session.username = "cookie";
  res.send('I set a cookie')
})

app.get('/get', (req, res) => { // SEE COOKIE
  res.send(req.session.username)
})

app.get('/logout', (req, res)=>{ // LOG OUT
	req.session.destroy(
    (err)=>{
	    if (err) {
		    res.redirect('/guests')
	    } else {
        res.redirect('/')
      }
	  });
});




// CONNECT TO MONGO //
mongoose.connect(
  MONGODB_URI ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log('connected to mongoose');
  }
);


// LISTENER //
app.listen(PORT, () => {
  console.log('listening...');
})
