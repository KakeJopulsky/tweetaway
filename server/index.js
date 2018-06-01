const express = require('express');
const path  = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'dist')));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
// ROUTES
app.get('/', (req, res) => res.send('Hello World!'));
