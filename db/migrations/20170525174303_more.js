exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('outcomes', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
      table.foreign('user_id')
      .references('users.id');
      table.integer('comment')
      table.integer('outcome_types_id')
      table.foreign('outcome_types_id')
      .references('outcome_types.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('outcomes')
  ])
};
