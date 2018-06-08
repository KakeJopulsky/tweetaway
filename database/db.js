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

module.exports.findAndUpdate = (id, newData, cb) => {
  console.log(id);
  Tweet.findByIdAndUpdate(id, newData)
    .then(res =>  console.log('in db, findById, ', res))
    .catch(err => console.log('in db, findById, ', err))

  // User should be able to submit tweet with new message and date. 
  // We should update the given tweet and find it with the ID. Find out what this func needs and DO IT!
};

// Get all tweets from select user
module.exports.getAll = (username, cb) => {
  Tweet.find({ user: username })
    .then(tweets => cb(tweets))
    .catch(err => console.log(err))
};
