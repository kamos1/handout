const ModelBase = require('../db/modelbase');
const Outcome = require('./Outcome')

const User = ModelBase.extend({
  tableName: 'users',
  outcomes: () => this.hasMany(Outcome),
});

module.exports = User;
