const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)

app.use(bodyParser.json());

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      console.error('error:', error);
    });
});

app.get('/api/v1/wins', (request, response) => {
  database('wins').select()
    .then(wins => {
      response.status(200).json(wins)
    })
    .catch(error => {
      console.error('error', error);
    })
})

app.get('/api/v1/losses', (request, response) => {
  database('losses').select()
    .then(losses => {
      response.status(200).json(losses)
    })
    .catch(error => {
      console.error('error', error);
    })
})



app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
