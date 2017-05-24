
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      
    })
  ])
};

exports.down = function(knex, Promise) {

};
