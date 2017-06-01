
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.renameColumn('userID', 'slack_id')
      table.string('user_id')
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knext.schema.table('users', function (table) {
      table.renameColumn('slack_id', 'userID')
      table.dropColumn('user_id')
    })
  ])
};
