const knex = require('knex')(require('../knexfile'));
const bookshelf = require('bookshelf')(knex);
const modelbase = require('bookshelf-modelbase')(bookshelf);

module.exports = modelbase;
