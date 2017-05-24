// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/slack',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
  //
  production: {
    client: 'postgresql',
    connection: {
      database: 'postgres://alwgjshlbfavea:671c0675cac59368e2c5a9c3fd864d5b71276aebf9d5a9639ef0a12942f5a08f@ec2-54-197-232-155.compute-1.amazonaws.com:5432/d9lpul1fp5qipj',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    ssl: true
  }

};
