const { insert, remove, findAndUpdate, getAll, getSorted } = require('../database/db.js');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const passport = require('passport');
const express = require('express');
const moment = require('moment');
const path  = require('path');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', express.static(path.join(__dirname, '../dist')));
app.listen(3000, () => console.log('Sup dogs we\'re listening on port 3000!'));

let tweetQueue = [];  // Contains 5 of next tweets to he shipped

////////////////////
////// Routes //////
////////////////////

// Check session data to see if user is logged in
// If so, return user info + all saved tweets
app.get('/user', (req, res) => {
  if(req.session.passport) {
    let { username } = req.session.passport.user;
    getAll(username, (tweets) => {
      res.send({ user: req.session.passport.user, tweets: tweets });
    })
  } else {
    res.send(false);
  }
});

// Save tweet to db
app.post('/post/tweet', (req, res) => {
  let { message, date } = req.body;
  let { username, token, tokenSecret } = req.session.passport.user;
  let newTweet = {
    user: username,
    message: message,
    date: date,
    token: token,
    token_secret: tokenSecret
  };
  insert(newTweet, (res) => console.log("Successfully inserted ", res._id, " into db"));
  updateQueue();
  res.sendStatus(200);
});

// Update already saved tweet in db
app.post('/update', (req, res) => {
  let { id, message, date } = req.body;
  findAndUpdate(id, { message: message, date: date }, (res) => console.log(res));
  res.sendStatus(200);
});

app.post('/delete/tweet', ({ body }, res) => {
  remove(body.id, () => res.sendStatus(200));
});

// Returns all tweets from a given username
app.get('/get/tweets', (req, res) => {
  let { username } = req.session.passport.user;
  getAll(username, (userTweets) => res.send(userTweets));
});

/////////////////////////////////
// PassportJS Authentification //
/////////////////////////////////

app.use(passport.initialize());

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/' }
));

// User profile information, and OAuth tokens saved in session data
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

///////////////////////
////// Tweeting ///////
///////////////////////

const postTweet = ({ _id, message, token, token_secret }) => {
  // post tweet
  // shift from queue, will be garbage collected
  // delete from db, updateQueue
}

///////////////////////
///// Scheduling //////
///////////////////////

// Get 5 sorted tweets
// Attach Cron jobs to tweet obj and push to cache
// Repeat if most recently inserted tweet is sooner than last tweet in queue!
const attachJobs = (tweets) => {
  console.log(tweets);
  tweetQueue = tweets.map((tweet) => {
    tweet.job = schedule.scheduleJob(tweet.date, () => postTweet(tweet));
    return tweet;
  });
}

async function updateQueue() {
  // Filter tweets if outdated
  await getSorted(tweets => attachJobs(tweets.filter(tweet => tweet.date - Date.now() > 10000)));
}

updateQueue();
