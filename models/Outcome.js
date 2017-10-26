const ModelBase = require('../db/modelbase')
const User = require('./User');
const outcomeType = require('./Outcome_Type');

const Outcome = ModelBase.extend({
  tableName: 'outcomes',
  users: () => this.belongsTo(User),
  outcome_types: () => this.belongsTo(outcomeType),
});

module.exports = Outcome;
