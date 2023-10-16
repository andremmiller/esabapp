// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql2',
  connection: {
    host: '10.4.20.37', //mp
    //host: 'localhost', //casa
    //host: 'mysql', // docker
    port: 3306,
    database: 'esabapp',
    user:     'root',
    password: 'senha'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
