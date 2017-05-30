const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bookshelf = require('bookshelf')(database);
const ModelBase = require('bookshelf-modelbase')(bookshelf);

const User = ModelBase.extend({
  tableName: 'users',
  outcomes: () => this.hasMany(Outcome),
});

const Outcome = ModelBase.extend({
  tableName: 'outcomes',
  users: () => this.belongsTo(User),
  outcome_types: () => this.belongsTo(Outcome_Type)
});

const Outcome_Type = ModelBase.extend({
  tableName: 'outcome_types',
  outcomes: () => this.hasMany(Outcome)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));

app.get('/', (request, response) => response.send('It works!'));

app.post('/add', (request, response) => {
  const text = request.body.text.split(' ');
  const type = text[0].replace(/['",]+/g, '');
  const user = text[1].replace(/['",]+/g, '');
  const userInfo = user.split('|')
  const username = userInfo[1].replace(/['",>]+/g, '');
  let outcome_type_id;

  const body = {
    response_type: "in_channel",
    text: `${user} recieved a ${type}`
  };

  switch (type) {
    case 'win':
      User.findOrCreate({ userID: user, username: username })
        .then((user) => {
          Outcome.create({user_id: user.id, outcome_types_id: 1})
        })
        .then(() => response.status(200).send(body))
        .catch((error) => response.status(500).send(error))
    case 'loss':
      User.findOrCreate({ userID: user, username: username })
        .then((user) => {
          Outcome.create({user_id: user.id, outcome_types_id: 2})
        })
        .then(() => response.status(200).send(body))
        .catch((error) => response.status(500).send(error))
  };
});

app.post('/check', (request, response) => {
  const text = request.body.text.split(' ');
  const type = text[0].replace(/['",]+/g, '');
  const user = text[1].replace(/['",]+/g, '');

  switch (type) {
    case 'win':
      User.findOne({ userID: user})
      .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: 1}))
      .then((outcomes) => response.status(200)
        .send({text: `You have ${outcomes.length} wins` }))
      .catch((error) => response.status(500).send(error))
    case 'loss':
      User.findOne({ userID: user})
      .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: 2}))
      .then((outcomes) => response.status(200)
        .send({text: `You have ${outcomes.length} losses` }))
      .catch((error) => response.status(500).send(error))
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
});

module.exports = app
