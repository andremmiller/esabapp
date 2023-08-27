/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('desc').notNullable()
        
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('id').inTable('users');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('games')
};
