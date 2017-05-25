exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('wins', function (table) {
      table.dropColumn('count');
    }),

    knex.schema.table('losses', function(table) {
      table.dropColumn('count')
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('wins', (table) => {
      table.integer('count').unsigned()
      table.foreign('count')
      .references('users.id');
      table.timestamps(true);
    }),
    knex.schema.createTable('losses', (table) => {
      table.integer('count').unsigned()
      table.foreign('count')
      .references('users.id');
      table.timestamps(true);
    })
  ])
};
