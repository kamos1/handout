const knex = require('./knex')
const bookshelf = require('bookshelf')(knex);
const modelbase = require('bookshelf-modelbase')(bookshelf);

module.exports = modelbase;
