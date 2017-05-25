exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcome_types', (table) => {
      table.string('name')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcome_type', function (table) {
      table.dropColumn('name');
    })
  ]);
};
