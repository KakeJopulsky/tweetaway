const { insert, remove, findAndUpdate, getAll } = require('../database/db.js');
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
app.get('/user', (req, res) => {
  // Check session data to see if user is logged in
  // If so, return al tweets from user
  if(req.session.passport) {
    let { username } = req.session.passport.user;
    getAll(username, (tweets) => {
      res.send({ user: req.session.passport.user, tweets: tweets });
    })
  } else {
    res.send(false);
  }
});

app.post('/post/tweet', (req, res) => { // Save a tweet to db
  let { message, date } = req.body;
  let { username, token, tokenSecret } = req.session.passport.user;
  let newTweet = {
    user: username,
    message: message,
    date: date,
    token: token,
    token_secret: tokenSecret
  };
  insert(newTweet, (res) => console.log(res._id));
  //Send back res._id to client incase they edit queued tweets
  res.sendStatus(200);
});

app.get('/get/tweets', (req, res) => {
  // Returns all tweets from user
  let { username } = req.session.passport.user;
  getAll(username, (userTweets) => res.send(userTweets));
});

app.post('/update', (req, res) => {
  let { id, message, date } = req.body;
  findAndUpdate(id, { message: message, date: date }, (res) => console.log(res));
  res.sendStatus(200);
})

// PassportJS Authentification
app.use(passport.initialize());

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/' }
));

passport.serializeUser((user, done) => {
  let { id, username, displayName, photos } = user.profile;
  let { token, tokenSecret } = user;
  done(null, { id, username, displayName, photo: photos[0].value, token, tokenSecret } )
});

passport.deserializeUser((user, done) => {
  let { id, username, displayName, photos } = user.profile;
  let { token, tokenSecret } = user;
  done(null, { id, username, displayName, photo: photos[0].value, token, tokenSecret } )
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
}, (token, tokenSecret, profile , cb) => cb(null, { profile: profile, token: token, tokenSecret: tokenSecret })));
