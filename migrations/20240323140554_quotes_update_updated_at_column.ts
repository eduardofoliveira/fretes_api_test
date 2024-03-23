import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    CREATE OR REPLACE FUNCTION atualizar_updated_at_quotes()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_atualizar_updated_at_quotes
    BEFORE UPDATE ON quotes
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_updated_at_quotes();
  `);
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    DROP TRIGGER IF EXISTS trigger_atualizar_updated_at_quotes ON quotes;
    DROP FUNCTION IF EXISTS atualizar_updated_at_quotes();
  `);
}

