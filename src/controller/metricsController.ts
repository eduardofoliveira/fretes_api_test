import { Request, Response } from "express";
import { z } from 'zod'

import { getQuotesMetrics } from '../repository/quotesRepository'

export default {
    handle: async (req: Request, res: Response) => {
        const { last_quotes } = req.query

        const scheme = z.object({
            last_quotes: z.string().optional()
        })

        const parsed = scheme.parse({ last_quotes })

        const result = await getQuotesMetrics({ last_quotes: parsed.last_quotes })

        if (result.length === 0) {
            return res.status(404).json({ message: 'Nenhum dado encontrado' })
        }

        let carriers: any = {}

        let carrier = result.reduce((acc: any, item: any) => {
            if (!carriers[item.carrier]) {
                carriers[item.carrier] = {
                    quantidade: 1,
                    total: item.final_price,
                    fretes: [item.final_price]
                }
            } else {
                carriers[item.carrier] = {
                    quantidade: carriers[item.carrier].quantidade + 1,
                    total: carriers[item.carrier].total + item.final_price,
                    fretes: [...carriers[item.carrier].fretes, item.final_price]
                }
            }

            if (!acc.freteMaisBarato) {
                acc.freteMaisBarato = item.final_price
            }
            if (!acc.freteMaisCaro) {
                acc.freteMaisCaro = item.final_price
            }

            return {
                freteMaisBarato: acc.freteMaisBarato > item.final_price ? item.final_price : acc.freteMaisBarato,
                freteMaisCaro: acc.freteMaisCaro < item.final_price ? item.final_price : acc.freteMaisCaro,
            }
        }, { freteMaisCaro: undefined, freteMaisBarato: undefined })

        carriers = carriers = Object.keys(carriers).map((item: any) => {
            carriers[item].media = carriers[item].fretes.reduce((acc: any, item: any) => acc += item, 0) / carriers[item].fretes.reduce((acc: any, item: any) => acc += 1, 0)
            carriers[item].media = parseFloat(carriers[item].media).toFixed(2)
            carriers[item].total = parseFloat(carriers[item].total).toFixed(2)
            delete carriers[item].fretes

            return { [item]: carriers[item] }
        }).reduce((acc: any, item: any) => {
            return { ...acc, ...item }
        })

        carrier = {
            freteMaisBarato: parseFloat(carrier.freteMaisBarato).toFixed(2),
            freteMaisCaro: parseFloat(carrier.freteMaisCaro).toFixed(2)
        }

        return res.json({ ...carriers, ...carrier })
    }
}
