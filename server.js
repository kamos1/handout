const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const token = require('./token');

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
  const requestToken = request.body.token.replace(/['",]+/g, '');

  if(text.length < 2) {
    response.status(500).send({text: 'You made a mistake'})
  }

  // if(text.length < 2 || requestToken !== token) {
  //   response.status(500).send({text: 'You made a mistake'})
  // }

  const type = text[0].replace(/['",<>]+/g, '');
  const slackId = text[1].replace(/['",]+/g, '');
  const userInfo = slackId.split('|')
  const userId = userInfo[0].replace(/['",<>]+/g, '');
  const username = userInfo[1].replace(/['",>]+/g, '');
  let outcome_type_id;

  const body = {
    response_type: "in_channel",
    text: `${slackId} recieved a ${type}`
  };

  type === "win" ? outcome_type_id = 1 : outcome_type_id = 2;

  User.findOrCreate({ slack_id: slackId, username: username, user_id: userId })
        .then((user) => {
          Outcome.create({user_id: user.id, outcome_types_id: outcome_type_id})
        })
        .then(() => response.status(200).send(body))
        .catch((error) => response.status(500).send(error))

  // switch (type) {
  //   case 'win':
  //     User.findOrCreate({ userID: user, username: username })
  //       .then((user) => {
  //         Outcome.create({user_id: user.id, outcome_types_id: 1})
  //       })
  //       .then(() => response.status(200).send(body))
  //       .catch((error) => response.status(500).send(error))
  //   case 'loss':
  //     User.findOrCreate({ userID: user, username: username })
  //       .then((user) => {
  //         Outcome.create({user_id: user.id, outcome_types_id: 2})
  //       })
  //       .then(() => response.status(200).send(body))
  //       .catch((error) => response.status(500).send(error))
  // };
});

app.post('/check', (request, response) => {
  const text = request.body.text.split(' ');
  const type = text[0].replace(/['",]+/g, '');
  const user = text[1].replace(/['",]+/g, '');
  const userInfo = user.split('|')
  const username = userInfo[1].replace(/['",>]+/g, '');
  let outcome_type_id;

  if (type === 'win') {
      User.findOne({ slack_id: user })
      .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: 1}))
      .then((outcomes) => response.status(200)
        .send({text: `You have ${outcomes.length} wins` }))
      .catch((error) => response.status(500).send(error))
    } else {
      User.findOne({ slack_id: user})
      .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: 2}))
      .then((outcomes) => response.status(200)
        .send({text: `You have ${outcomes.length} losses` }))
      .catch((error) => response.status(500).send(error))
    }
});

app.get('/count', (request, response) => {
  const user = request.query.user_name
  const type = request.query.text.replace(/['",]+/g, '');
  let outcome_type_id;

  type === "wins" ? outcome_type_id = 1 : outcome_type_id = 2;

  User.findOne({username: user})
    .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: outcome_type_id}))
    .then((outcomes) => response.status(200)
      .send({text: `You have ${outcomes.length} ${type} `}))
    .catch((error) => response.status(500).send(error))
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
});

module.exports = app
