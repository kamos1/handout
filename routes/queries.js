const typeCheck = require('../helpers/typeCheck');
const textCleaner = require('../helpers/textCleaner');
const userCleaner = require('../helpers/userCleaner');
const validateInput = require('../helpers/validateInput');

const User = require('../models/User');
const Outcome = require('../models/Outcome');

const addOutcome = (request, response) => {
  const text = request.body.text.split(' ');

  const validate = validateInput(text[0]);
  if (validate === 'You made a mistake') {
    return response.status(500).send({ text: 'You made a mistake' });
  }

  const type = textCleaner(text[0]);
  const slackId = textCleaner(text[1]);
  const userInfo = slackId.split('|');
  const userId = userCleaner(userInfo[0]);
  const username = userCleaner(userInfo[1]);

  const body = {
    response_type: 'in_channel',
    text: `*${slackId} recieved a ${type}*`,
  };

  User.findOrCreate({ slack_id: slackId, username: username, user_id: userId })
    .then((user) => {
      Outcome.create({ user_id: user.id, outcome_types_id: typeCheck(type) });
    })
    .then(() => response.status(200).send(body))
    .catch(error => response.status(500).send(error));
};

const checkOutcomes = (request, response) => {
  const text = request.body.text.split(' ');
  const type = textCleaner(text[0]);
  const user = textCleaner(text[1]);

  new User({ slack_id: user })
    .fetch()
    .then(addUser => Outcome.findAll({ user_id: addUser.id, outcome_types_id: typeCheck(type) }))
    .then(outcomes => response.status(200)
      .send({ text: `*${user} has ${outcomes.length} ${type}*` }))
    .catch(error => response.status(500).send(error));
};

const getWins = (request, response) => {
  const user = request.params.username;
  const type = 'win';

  new User({ username: user })
    .fetch()
    .then(winUser => Outcome.findAll({ user_id: winUser.id, outcome_types_id: typeCheck(type) }))
    .then(outcomes => response.status(200)
      .send({ text: outcomes.length }))
    .catch(error => response.status(500).send(error));
};

const getLosses = (request, response) => {
  const user = request.params.username;
  const type = 'loss';

  new User({ username: user })
    .fetch()
    .then(lossUser => Outcome.findAll({ user_id: lossUser.id, outcome_types_id: typeCheck(type) }))
    .then(outcomes => response.status(200)
      .send({ text: outcomes.length }))
    .catch(error => response.status(500).send(error));
};

module.exports = {
  addOutcome,
  checkOutcomes,
  getWins,
  getLosses,
};
