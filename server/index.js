const { insert, remove, getOne, getAll } = require('../database/db.js');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const path  = require('path');
require('dotenv').config();
const app = express();

// middleware
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', express.static(path.join(__dirname, '../dist')));
app.listen(3000, () => console.log('Sup dogs we\'re listening on port 3000!'));

// ROUTES
app.get('/user', (req, res) => {  // Check session data to see if user is logged in
  // console.log(req.session.passport);
  req.session.passport
    ? res.send(req.session.passport.user)
    : res.send(false);
});

app.post('/post/tweet', ({ body: { message, date } }, res) => { // Save a tweet to db
  // insert(body, (res) => console.log(res._id));
  // Send back res._id to client incase they edit queued tweets
  res.sendStatus(200);
});

app.get('/get/tweets', (req, res) => {
  // return all tweets from user from db
  console.log(req.session.passport.user);
});

// PassportJS Authentification
app.use(passport.initialize());

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/' }
));

passport.serializeUser(({ id, username, displayName, photos }, done) => {
  done(null, { id, username, displayName, photo: photos[0].value } )
});

passport.deserializeUser(({ id, username, displayName, photos }, done) => {
  done(null, { id, username, displayName, photo: photos[0].value } )
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
}, (token, tokenSecret, profile , cb) => cb(null, profile)));


/*
  Each tweet sent back will have an _id attached to it.
  That should make editing, deleting possible. 
  Checking if user isLoggedIn will be GET req to /user route
  TODO:
  return all tweets from user to client
*/