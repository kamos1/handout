const ModelBase = require('../db/modelbase');
const Outcome = require('./Outcome')

const user = ModelBase.extend({
  tableName: 'users',
  outcomes: () => this.hasMany(Outcome),
});

module.exports = user;
