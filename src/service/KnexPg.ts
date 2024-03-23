import knex from 'knex'
//@ts-ignore
import knexConfig from '../../knexfile'

const getConnection = (): Promise<knex.Knex> => {
    return new Promise((resolve, reject) => {
        try {
            // const Pgknex = knex({
            //     client: 'pg',
            //     connection: {
            //         connectionString: process.env.POSTGRES_CONN_STRING,
            //         host: process.env.POSTGRES_HOST,
            //         port: parseInt(process.env.POSTGRES_PORT as string, 10),
            //         user: process.env.POSTGRES_USER,
            //         database: process.env.POSTGRES_DB,
            //         password: process.env.POSTGRES_PASSWORD,
            //         ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
            //     },
            //     pool: {
            //         min: 2,
            //         max: 10
            //     }
            // });

            const Pgknex = knex(knexConfig.development);

            resolve(Pgknex)
        } catch (error) {
            reject(error)
        }
    })
}

export {
    getConnection
}
