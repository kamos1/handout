
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('outcome_types', (table) => {
      table.increments('id').primary();
      table.string('win'),
      table.string('loss')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('outcome_types')
  ])
};
