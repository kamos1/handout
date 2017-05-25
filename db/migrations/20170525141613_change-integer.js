exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('wins', function (table) {
      table.renameColumn('user_id', 'count');
    }),

    knex.schema.table('losses', function(table) {
      table.renameColumn('user_id', 'count')
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('wins', function (table) {
      table.renameColumn('count', 'used_id');
    }),
    
    knex.schema.table('losses', function(table) {
      table.renameColumn('user_id', 'count')
    })
  ]);
};
