exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('outcomes')
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('outcomes', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
      table.foreign('user_id')
      .references('users.id');
      table.string('username')
      table.timestamps(true);
    })
  ])
};
