const insertQuoteResults = async ({ data }: { data: any }): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const knex = await (await import('../service/KnexPg')).getConnection()

            let listaAwait: any = []

            data.dispatchers.map(async (dispatcher: any) => {
                return dispatcher.offers.map(async (item: any) => {
                    listaAwait.push(knex('quotes').insert({
                        carrier: item.carrier.name,
                        final_price: item.final_price,
                        json: item,
                    }))
                })
            })

            await Promise.all(listaAwait)

            await knex.destroy()

            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const getQuotesMetrics = async ({ last_quotes }: { last_quotes?: string }): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const knex = await (await import('../service/KnexPg')).getConnection()
            let data = {}

            if (!last_quotes) {
                data = await knex('quotes').select('*').orderBy('created_at', 'desc')
            } else {
                data = await knex('quotes').select('*').orderBy('created_at', 'desc').limit(parseInt(last_quotes))
            }

            await knex.destroy()

            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export {
    insertQuoteResults,
    getQuotesMetrics
}
