
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcomes', function (table) {
      table.dropColumn('comment')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcomes', function (table) {
      table.string('comment')
    })
  ])
};
