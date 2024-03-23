import { Request, Response } from "express";

import { requestQuote } from '../service/api'
import { insertQuoteResults } from '../repository/quotesRepository'


export default {
    handle: async (req: Request, res: Response) => {
        try {
            const { recipient, volumes } = req.body

            const data: any = await requestQuote({ recipient, volumes })

            insertQuoteResults({ data })

            const retorno = data.dispatchers.map((dispatcher: any) => {
                return dispatcher.offers.map((item: any) => {
                    return {
                        name: item.carrier.name,
                        service: item.service,
                        deadline: item.delivery_time.days,
                        price: item.final_price
                    }
                })
            }).flat()

            return res.json({ carrier: retorno })
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }
}
