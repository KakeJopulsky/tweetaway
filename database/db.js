const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweetlater');

const db = mongoose.connection;

const tweetSchema = mongoose.Schema({
  user: { 
    type: String, 
    required: true 
  },
  message: {
    type: String,
    required: true 
  },
  date: {
    type: String,
    required: true 
  },
  token: {
    type: String,
    required: true 
  },
  token_secret: {
    type: String,
    required: true 
  },
});

/*
  let test = {
    user: 'Test',
    message: 'Testing 123',
    date: '12345',
    token: '12121212121',
    token_secret: '0000'
  }
*/

const Tweet = mongoose.model('Tweet', tweetSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

// OPERATIONS
mongoose.Promise = Promise;

module.exports.insert = (tweet, cb) => {
  Tweet.create(tweet)
    .then(res => cb(res))
    .catch(err => console.log(err))
};

module.exports.remove = (id) => {
  Tweet.findById(id).remove().exec();
  console.log('deleted from db');
};

module.exports.getOne = (id, cb) => {
  Tweet.findById(id, (err, res) => {
    if (err, null) return cb(err);
    cb(null, res);
  });
};

// Get all tweets from select user
module.exports.getAll = (userID, cb) => {
  Tweet.find(userID, (err, res) => {
    if (err) return cb(err, null);
    return cb(null, res);
  });
};
