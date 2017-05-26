
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('outcome_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('outcome_types').insert([
        {id: 1, name: 'win'},
        {id: 2, name: 'loss'}
      ]);
    });
};
