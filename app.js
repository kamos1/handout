const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const environment = process.env.DATABASE_URL || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
//verify app is working
app.get('/', (request, response) => response.send('It works!'));

app.post('/api/v1/users', ((request, response) => {
    const { message } = request.body;
    const id = Date.now();

    response.status(200).json({ id, message })
  })
)

app.get('/api/v1/users', (request, response) => {
  console.log(request.body);
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

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
})
