const ModelBase = require('../db/modelbase');
const Outcome = require('./Outcome')

const Outcome_Type = ModelBase.extend({
  tableName: 'outcome_types',
  outcomes: () => this.hasMany(Outcome)
});

module.exports = Outcome_Type;
