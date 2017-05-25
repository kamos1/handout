const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('locus')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)
const bookshelf = require('bookshelf')(database)
const ModelBase = require('bookshelf-modelbase')(bookshelf);

const User = ModelBase.extend({
  tableName: 'users',
  outcomes: () => this.hasMany(Outcome),
})
const Outcome = ModelBase.extend({
  tableName: 'outcomes',
  outcomes: () => this.belongsTo(User)
  outcomes: () => this.belongsTo(Outcome_Type)
})
const Outcome_Type = ModelBase.extend({
  tableName: 'outcome_types',
  outcome_types: () => this.hasMany(Outcome)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));
//verify app is working
app.get('/', (request, response) => response.send('It works!'));

app.post('/api/v1/users', (request, response) => {
    const text = request.body.text.split(' ');
    const user_id = text[0]
    const type = text[1]
    User.findOrCreate({ userID: user_id })
      .then(() => {
        if(type === 'win') {
          Win.create({})
        }
      }

    response.status(200).json({ user_id, type })
  })

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
