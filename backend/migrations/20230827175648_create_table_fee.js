/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('fee', table => {
        table.increments('id')
        table.float('value').notNullable().defaultTo(0)
        table.string('status').notNullable()
        
        table.integer('loanId').unsigned().notNullable();
        table.foreign('loanId').references('id').inTable('loan');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('fee')
};
