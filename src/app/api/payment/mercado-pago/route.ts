import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceMPValidator } from '@/features/payment';


export async function POST(request: Request) {
  try {
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error('the enviroment variable MERCADO_PAGO_ACCESS_TOKEN not found')
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('the enviroment variable NEXT_PUBLIC_BASE_URL not found')
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    })

    const domain = process.env.NEXT_PUBLIC_BASE_URL
    const tempDomain = 'https://3af5-181-118-99-121.ngrok-free.app' // ngrok url

    const orderId = uuidv4()
    const uuid = uuidv4()
    const preference = new Preference(client)

    const newPreference = await preference.create({
      body: {
        auto_return: 'approved',                                              // Retorna sin importar si el pago fue exitoso o no
        statement_descriptor: 'Garage Go',                                    // Descripción en MP
        external_reference: orderId,                                          // ID de la orden creada en la base de datos de la app 
        notification_url: `${tempDomain}/api/payment/mercado-pago/webhook`,   // URL del Webhook para que MP mande la info de la transacción
        back_urls: {
          success: `${tempDomain}/services`,
          failure: `${tempDomain}/services`,
          pending: `${tempDomain}/services`
        },
        items: [{
          id: uuid,
          title: "Servicios",
          category_id: "Servicios",
          currency_id: 'ARS',
          description: "Mantención por kilometraje | Garage Go",
          quantity: 1,
          unit_price: 100
        }],
        payer: {
          name: 'Lisandro',
          surname: 'Martinez',
          email: 'lisandromartinez@gmail.com',
          phone: {
            area_code: '+56',
            number: '123456789',
          }
        },
        payment_methods: {
          installments: 6,
          excluded_payment_types: [
            { id: 'atm' },              // Cajeros automáticos
            { id: 'ticket' },           // Vales o cupones para pagar en tiendas físicas
            { id: 'bank_transfer' }     // Transferencias offline (no instantáneas)
          ],
          excluded_payment_methods: [
            { id: 'servipag' },
            { id: 'sencillito' }
          ],
        }
      }
    })

    const check = PreferenceMPValidator.safeParse(newPreference)
    if (check.success) {
      // console.log('🟢 Success MP: ', newPreference)
      return NextResponse.json({
        status: newPreference.api_response.status,
        redirectURL: newPreference.init_point
      })
    } else {
      console.log('🔴 Failure MP')
      console.log(check.error)
    }


  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}