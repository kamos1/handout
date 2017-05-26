const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
  users: () => this.belongsTo(User),
  outcome_types: () => this.belongsTo(Outcome_Type)
})
const Outcome_Type = ModelBase.extend({
  tableName: 'outcome_types',
  outcomes: () => this.hasMany(Outcome)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));

app.get('/', (request, response) => response.send('It works!'));

app.post('/add', (request, response) => {
    const text = request.body.text.split(' ');
    const user_id = text[0]
    const type = text[1]
    var fixType = type.replace(/win',/i, 'win');
    let outcome_type_id;

    fixType === "win" ? outcome_type_id = 1 : outcome_type_id = 2

    User.findOrCreate({ userID: user_id })
      .then((user) => {
        Outcome.create({user_id: user.id, outcome_types_id: outcome_type_id})
      })
      .then(() => console.log('finish'))

    const body = {
      response_type: "in_channel",
      text: `${type} recieved a ${user_id}`
    }

    response.status(200).send(body);
  })

app.get('/get', (request, response) => {
  console.log(request.body);
  database('users').select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      console.error('error:', error);
    });
});


app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}.`)
})
