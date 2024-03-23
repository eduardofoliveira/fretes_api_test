import axios from 'axios'
import { z } from "zod";

const schema = z.object({
    recipient: z.object({ address: z.object({ zipcode: z.number() }) }),
    volumes: z.array(
        z.object({
            category: z.string(),
            amount: z.number(),
            unitary_weight: z.number(),
            price: z.number(),
            sku: z.string(),
            height: z.number(),
            width: z.number(),
            length: z.number()
        })
    )
});

type IRequestQuote = z.infer<typeof schema>;

const requestQuote = async ({ recipient, volumes }: IRequestQuote) => {
    return new Promise(async (resolve, reject) => {
        try {
            const shipper = {
                registered_number: process.env.FRETE_API_CNPJ,
                token: process.env.FRETE_API_TOKEN,
                platform_code: process.env.FRETE_API_CODIGO
            }

            const newRecipient = {
                type: 0,
                country: "BRA",
                zipcode: parseInt(recipient.address.zipcode.toString(), 10)
            }

            const newVolumes = volumes.map(volume => {
                return {
                    category: volume.category.toString(),
                    amount: volume.amount,
                    unitary_weight: volume.unitary_weight,
                    unitary_price: volume.price,
                    sku: volume.sku,
                    width: volume.width,
                    height: volume.height,
                    length: volume.length
                }
            })

            const data = {
                shipper,
                recipient: newRecipient,
                dispatchers: [
                    {
                        registered_number: process.env.FRETE_API_CNPJ,
                        zipcode: parseInt(process.env.FRETE_API_CEP as string),
                        volumes: newVolumes
                    }
                ],
                reverse: false,
                simulation_type: [
                    0
                ],
                returns: {
                    composition: false,
                    volumes: false,
                    applied_rules: false
                }
            }

            // console.log(JSON.stringify(data, null, 2))

            const response = await axios.post('https://sp.freterapido.com/api/v3/quote/simulate', data)

            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    })
}

export {
    requestQuote
}
