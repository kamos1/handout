const typeCheck = (type) => {
  let outcome_type_id;
  switch (type) {
    case 'win':
      return outcome_type_id = 1
    case 'wins':
      return outcome_type_id = 1
    case 'loss':
      return outcome_type_id = 2
    case 'losses':
      return outcome_type_id = 2
    default:
      return 'not a type'
  }
}

module.exports = typeCheck;
