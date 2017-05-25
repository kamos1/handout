
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('userID')
      table.string('username')
      table.timestamps(true);
    }),

    knex.schema.createTable('wins', (table) => {
      table.increments('id').primary();
      table.string('win');
      table.integer('user_id').unsigned()
      table.foreign('user_id')
      .references('users.id');
      table.timestamps(true);
    }),

    knex.schema.createTable('losses', (table) => {
      table.increments('id').primary();
      table.string('losses');
      table.integer('user_id').unsigned()
      table.foreign('user-id')
      .references('users.id');
      table.timestamps(true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('wins'),
    knex.schema.dropTable('losses')
  ])
};
