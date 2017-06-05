const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bookshelf = require('bookshelf')(database);
const ModelBase = require('bookshelf-modelbase')(bookshelf);

const isWin = require('./isWin');
const textCleaner = require('./textCleaner');
const userCleaner = require('./userCleaner');
const validateInput = require('./validateInput');

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

app.get('/', (request, response) => response.send('Keji made a thing!'));

app.post('/add', (request, response) => {
  const text = request.body.text.split(' ');
  const requestToken = textCleaner(request.body.token);

  validateInput(text)

  const type = textCleaner(text[0]);
  const slackId = textCleaner(text[1]);
  const userInfo = slackId.split('|')
  const userId = userCleaner(userInfo[0]);
  const username = userCleaner(userInfo[1]);

  const body = {
    response_type: "in_channel",
    text: `${slackId} recieved a ${type}`
  };

  User.findOrCreate({ slack_id: slackId, username: username, user_id: userId })
        .then((user) => {
          Outcome.create({user_id: user.id, outcome_types_id: isWin(type)})
        })
        .then(() => response.status(200).send(body))
        .catch((error) => response.status(500).send(error))
});

app.post('/check', (request, response) => {
  const text = request.body.text.split(' ')
  const type = textCleaner(text[0]);
  const user = textCleaner(request.body.user_name);

  User.findOne({username: user})
    .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: isWin(type)}))
    .then((outcomes) => response.status(200)
      .send({text: `You have ${outcomes.length} ${type} `}))
    .catch((error) => response.status(500).send(error))
});

app.get('/count', (request, response) => {
  const user = request.query.user_name
  const type = textCleaner(request.query.text);

  User.findOne({username: user})
    .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: isWin(type)}))
    .then((outcomes) => response.status(200)
      .send({text: `You have ${outcomes.length} ${type} `}))
    .catch((error) => response.status(500).send(error))
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
});

module.exports = app
