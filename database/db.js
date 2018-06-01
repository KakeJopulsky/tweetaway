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

// OPERATIONS

module.exports.insert = (tweetObj, cb) => {
  Tweet.create(tweetObj, (err, entry) => {
    if (err) return cb(err, null);
    cb(null, entry._id);
  });
};

module.exports.remove = (id) => {
  Tweet.findById(id).remove().exec();
  console.log('removed from db');
};

module.exports.getOne = (id, cb) => {
  Tweet.findById(id, (err, res) => {
    if (err, null) return cb(err);
    cb(null, res);
  });
};

module.exports.getAll = (cb) => {
  Tweet.find({}, (err, res) => {
    if (err) return cb(err, null);
    return cb(null, res);
  });
};
