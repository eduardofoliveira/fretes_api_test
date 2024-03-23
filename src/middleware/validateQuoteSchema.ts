import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const quoteSchema = z.object({
    recipient: z.object({ address: z.object({ zipcode: z.string({ invalid_type_error: 'zipcode deve ser uma string', required_error: 'zipcode é obrigatorio' }) }) }),
    volumes: z.array(
        z.object({
            category: z.number({ invalid_type_error: 'volume.category deve ser um numero', required_error: 'volume.category é obrigatório' }),
            amount: z.number({ invalid_type_error: 'volume.amount deve ser um numero', required_error: 'volume.amount é obrigatório' }),
            unitary_weight: z.number({ invalid_type_error: 'volume.unitary_weight deve ser um numero', required_error: 'volume.unitary_weight é obrigatório' }),
            price: z.number({ invalid_type_error: 'volume.price deve ser um numero', required_error: 'volume.price é obrigatório' }),
            sku: z.string({ invalid_type_error: 'volume.sku deve ser uma string', required_error: 'volume.sku é obrigatório' }),
            height: z.number({ invalid_type_error: 'volume.height deve ser um numero', required_error: 'volume.height é obrigatório' }),
            width: z.number({ invalid_type_error: 'volume.width deve ser um numero', required_error: 'volume.width é obrigatório' }),
            length: z.number({ invalid_type_error: 'volume.length deve ser um numero', required_error: 'volume.length é obrigatório' })
        })
    ).nonempty({ message: 'volumes não pode ser vazio' })
});

type IRequestQuote = z.infer<typeof quoteSchema>;

const validateQuoteSchema = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipient, volumes } = req.body;

        quoteSchema.parse({ recipient, volumes });

        next();
    } catch (error: any) {
        return res.status(400).json({ error: error.errors });
    }
}

export {
    validateQuoteSchema,
    IRequestQuote
}
