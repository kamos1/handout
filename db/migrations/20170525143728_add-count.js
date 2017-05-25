
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('wins', (table) => {
      table.integer('count').unsigned()
    }),

    knex.schema.table('losses', (table) => {
      table.integer('count').unsigned()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('wins', function (table) {
      table.dropColumn('count');
    }),

    knex.schema.table('losses', function(table) {
      table.dropColumn('count')
    })
  ]);
};
