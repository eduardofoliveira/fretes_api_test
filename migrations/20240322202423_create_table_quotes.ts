import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('quotes', function (table) {
            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
            table.string('carrier').notNullable();
            table.float('final_price').notNullable();
            table.json('json').notNullable();
            table.datetime('created_at', { precision: 0 }).notNullable().defaultTo(knex.fn.now(0));
            table.datetime('updated_at', { precision: 0 }).notNullable().defaultTo(knex.fn.now(0));
        }).then(() => {
            return knex.schema.table('quotes', function (table) {
                table.index('created_at');
            });
        })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('quotes');
}
