// Postman Docs: https://documenter.getpostman.com/view/15366798/2sAXjKasp4#intro -> CheckoutPro
import { MerchantOrderMPValidator, SimplifiedPaymentMPValidator } from "@/features/payment"
import { NextRequest, NextResponse } from "next/server"

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('the enviroment variable MERCADO_PAGO_ACCESS_TOKEN not found')
}

const token = process.env.MERCADO_PAGO_ACCESS_TOKEN

const handlePaymentAPI = (paymentID: string) => {
  fetch(`https://api.mercadopago.com/v1/payments/${paymentID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const check = SimplifiedPaymentMPValidator.safeParse(data)
      if (!check.success) {
        console.error("invalid MP payment payload", check.error);
        return NextResponse.json({ message: 'invalid MP payment payload', error: check.error }, { status: 500 })
      }

      return NextResponse.json({}, { status: 200 })
    })
    .catch(error => {
      console.error(error)
      return NextResponse.json({ error: error }, { status: 500 })
    })
}

const handleOrderAPI = (orderID: string) => {
  fetch(`https://api.mercadopago.com/merchant_orders/${orderID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const check = MerchantOrderMPValidator.safeParse(data)
      if (!check.success) {
        console.error("invalid MP merchant_order payload", check.error);
        return NextResponse.json({ message: 'invalid MP merchant_order payload', error: check.error }, { status: 500 })
      }

      return NextResponse.json({}, { status: 200 })
    })
    .catch(error => {
      console.error(error)
      return NextResponse.json({ error: error }, { status: 500 })
    })
}

// ? Important: 
// MP hace un POST a este webhook enviando una URL con los query params 'id' y 'topic'
// lo importante es definir un comportamiento en base a estos 2 campos ya que el body de la request en algunos casos esta vacio,
// cuando no lo esta es de tipo (@/features/payment -> WebhookMPType), pero si convertimos siempre el body en json y validamos con Zod
// obtendremos en mas de una ocasion errores en el tipeo de datos que espera Zod y los que la app recibe realmente

// Example URLs
// URL: https://localhost:3000/api/payment/mercado-pago/webhook?id=117032201618&topic=payment
// URL: https://localhost:3000/api/payment/mercado-pago/webhook?id=32102273571&topic=merchant_order

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const topic = searchParams.get('topic')

    if (!id || !topic) {
      return NextResponse.json({ error: 'parameters id o topic not found' }, { status: 400 })
    }

    if (id && topic === 'payment') {
      handlePaymentAPI(id)
    } else if (id && topic === 'merchant_order') {
      handleOrderAPI(id)
    } else {
      return NextResponse.json({ error: 'Topic no reconocido' }, { status: 400 })
    }

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}