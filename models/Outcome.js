const ModelBase = require('../db/modelbase');
const User = require('./User')
const Outcome_Type = require('./Outcome_Type')

const Outcome = ModelBase.extend({
  tableName: 'outcomes',
  users: () => this.belongsTo(User),
  outcome_types: () => this.belongsTo(Outcome_Type)
});

module.exports = Outcome;
