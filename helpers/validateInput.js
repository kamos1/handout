const validateInput = (userInput) => {
  if(!userInput.includes('win') && !userInput.includes('loss') ) {
  return response.status(500).send({text: 'You made a mistake'})
  }
}

module.exports = validateInput;
