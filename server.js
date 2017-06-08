const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const routes = require('./routes/endpoints');
const port = (process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', (request, response) => response.sendFile(__dirname, 'dist/index.html'));

app.use('/', routes)

app.listen(port)
console.log(`Server is running on ${port}.`)

module.exports = app
