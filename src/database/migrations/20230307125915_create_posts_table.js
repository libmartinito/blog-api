/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('post', function (table) {
            table.increments('id').unique();
            table.integer('user_id')
                .references('id')
                .inTable('user')
                .notNullable();
            table.text('title').notNullable();
            table.text('body').notNullable();
            table.boolean('is_published').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('post');
};
