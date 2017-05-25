exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcome_types', function (table) {
      table.dropColumn('win')
      table.dropColumn('loss')
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('outcome_types', (table) => {
      table.string('win'),
      table.string('loss')
    }),
  ]);
};
