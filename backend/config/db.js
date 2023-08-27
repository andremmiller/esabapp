const config = require('../knexfile.js')
const knex = require('knex')(config)

// executa knex migrate:latest ao carregar o arquivo (inicializacao do sistema)
knex.migrate.latest([config])

module.exports = knex