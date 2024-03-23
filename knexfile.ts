import "dotenv/config";
import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            connectionString: process.env.POSTGRES_CONN_STRING,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT as string, 10),
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    staging: {
        client: 'pg',
        connection: {
            connectionString: process.env.POSTGRES_CONN_STRING,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT as string, 10),
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.POSTGRES_CONN_STRING,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT as string, 10),
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }

};

module.exports = config;
