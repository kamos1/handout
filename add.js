const add = (request) => {
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
}

module.exports = add;
