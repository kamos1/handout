exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('slack_id')
      table.string('user_id')
      table.string('username')
      table.timestamps(true);
    }),

    knex.schema.createTable('outcome_types', (table) => {
      table.increments('id').primary();
      table.string('type')
    }),

    knex.schema.createTable('outcomes', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
      table.foreign('user_id')
      .references('users.id');
      table.integer('outcome_types_id')
      table.foreign('outcome_types_id')
      .references('outcome_types.id');
      table.timestamps(true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('outcomes_types'),
    knex.schema.dropTable('outcomes')
  ])
};