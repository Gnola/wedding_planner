// DEPENDENCIES //
const express = require('express');
const app = express()
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection
require('dotenv').config()
const session = require('express-session');

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
app.use(session({ // set up session cookies
  secret: 'randomstring',
  resave: false,
  saveUninitialized:false
}))


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

app.get('/set', (req, res) => {
  req.session.username = "cookie";
  res.send('I set a cookie')
})

app.get('/get', (req, res) => {
  res.send(req.session.username)
})

app.get('/logout', (req, res)=>{
	req.session.destroy((err)=>{
		if(err){
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
  });


// LISTENER //
app.listen(PORT, () => {
  console.log('listening...');
})
