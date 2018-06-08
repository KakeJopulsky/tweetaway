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

const Tweet = mongoose.model('Tweet', tweetSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

//////////////////////
// Document operations
//////////////////////

mongoose.Promise = Promise;

module.exports.insert = (tweet, cb) => {
  Tweet.create(tweet)
    .then(res => cb(res))
    .catch(err => console.log(err))
};

module.exports.remove = (id, cb) => {
  Tweet.findOneAndRemove({ _id: id })
    .then(() => cb())
    .catch(err => console.log(err))
}

module.exports.findAndUpdate = (id, newData, cb) => {
  console.log(id);
  Tweet.findByIdAndUpdate(id, newData)
    .then(res =>  console.log('in db, findById, ', res))
    .catch(err => console.log('in db, findById, ', err))
};

// Get all tweets from select user
module.exports.getAll = (username, cb) => {
  Tweet.find({ user: username })
    .then(tweets => cb(tweets))
    .catch(err => console.log(err))
};

module.exports.getSorted = (cb) => {
  Tweet.find({}).sort({date: -1}).limit(5).exec()
    .then(docs => cb(docs))
    .catch(err => console.log(err))
};
