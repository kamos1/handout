require('./newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/endpoints')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));

app.get('/', (request, response) => response.send('Keji made a thing!'));

app.use('/', routes)

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
});

module.exports = app
