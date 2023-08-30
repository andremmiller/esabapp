/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('loans', table => {
        table.increments('id')
        table.date('endAt').notNullable()
        table.date('beginAt').notNullable()
        table.string('status').notNullable().defaultTo('Solicitado')

        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('id').inTable('users');

        table.integer('gameId').unsigned().notNullable();
        table.foreign('gameId').references('id').inTable('games');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('loans')
};
