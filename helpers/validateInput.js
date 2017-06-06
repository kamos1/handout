const validateInput = (userInput) => {
  if(!userInput.includes('win') && !userInput.includes('loss') ) {
  return 'You made a mistake';
  }
}

module.exports = validateInput;
