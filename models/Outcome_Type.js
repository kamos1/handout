const ModelBase = require('../db/modelbase');
const Outcome = require('./Outcome');

const outcomeType = ModelBase.extend({
  tableName: 'outcome_types',
  outcomes: () => this.hasMany(Outcome),
});

module.exports = outcomeType;
