const isWin = (type) => {
  let outcome_type_id;
  return type === 'win' || type === 'wins'? outcome_type_id = 1 : outcome_type_id = 2;
}

module.exports = isWin;
