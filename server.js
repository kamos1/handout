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
  if (text[0] !== 'win' || text[0] !== 'loss') {
    response.status(422).send({text: 'Check syntax. Missing win or loss.'})
  }
  
  const type = text[0];
  const user = text[1];
  const fixUser = user.replace(/['",]+/g, '');
  const fixType = type.replace(/['",]+/g, '');
  let outcome_type_id;


  fixType === "win" ? outcome_type_id = 1 : outcome_type_id = 2;

  const body = {
    response_type: "in_channel",
    text: `${fixUser} recieved a ${fixType}`
  };

  User.findOrCreate({ userID: fixUser })
    .then((user) => {
      Outcome.create({user_id: user.id, outcome_types_id: outcome_type_id})
    })
    .then(() => response.status(201).send(body))
    .catch((error) => response.status(500).send(error))
  });

app.post('/check', (request, response) => {
  const text = request.body.text.split(' ');
  const type = text[0].replace(/['",]+/g, '');
  const user = text[1].replace(/['",]+/g, '');

  if (type === 'win') {
    User.findOne({ userID: user})
    .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: 1}))
    .then((outcomes) => response.status(200)
      .send({response_type: "in_channel", text: `You have ${outcomes.length} wins` }))
    .catch((error) => response.status(500).send(error))
  } else {
    User.findOne({ userID: user})
    .then((user) => Outcome.findAll({user_id: user.id, outcome_types_id: 2}))
    .then((outcomes) => response.status(200)
      .send({response_type: "in_channel", text: `You have ${outcomes.length} losses` }))
    .catch((error) => response.status(500).send(error))
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
});

module.exports = app
