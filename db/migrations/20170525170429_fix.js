exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('outcomes', function (table) {
      table.dropColumn('username');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('outcomes', (table) => {
      table.string('username');
    })
  ])
};
