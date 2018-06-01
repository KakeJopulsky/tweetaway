const { insert, remove, getOne, getAll } = require('../database/db.js');
const bodyParser = require('body-parser');
const express = require('express');
const path  = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'dist')));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

// ROUTES
app.get('/', (req, res) => {
  res.send('Got a GET request!')
});
app.post('/', (req, res) => {
  res.send('Got a POST request')
});