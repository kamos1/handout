const typeCheck = (type) => {
  let outcomeTypeId;
  switch (type) {
    case 'win':
      return outcomeTypeId = 1
    case 'wins':
      return outcomeTypeId = 1
    case 'loss':
      return outcomeTypeId = 2
    case 'losses':
      return outcomeTypeId = 2
    default:
      return 'not a type'
  }
}

module.exports = typeCheck;
