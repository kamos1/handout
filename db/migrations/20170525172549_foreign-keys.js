
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcomes', function (table) {
      table.dropColumn('outcome_types_id');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcomes', (table) => {
      table.string('outcome_types_id')
    })
  ])
};
