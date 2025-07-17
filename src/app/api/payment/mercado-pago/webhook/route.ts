// Postman Docs: https://documenter.getpostman.com/view/15366798/2sAXjKasp4#intro -> CheckoutPro
import { NextRequest, NextResponse } from "next/server"
import { getOrderByID, updateInitialOrder } from "@/backend/actions"
import { roundedDecimals } from "@/utils"
import { randomUUID } from "crypto"

import { HttpStatus } from "@/backend/types"
import { MerchantOrderMPValidator, SimplifiedPaymentMPValidator } from "@/features/payment"
import { PayStatusType, UpdateOrderFromWebhookType } from "@/features/orders"

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('the enviroment variable MERCADO_PAGO_ACCESS_TOKEN not found')
}

const token = process.env.MERCADO_PAGO_ACCESS_TOKEN

/*
? Important: 

  Mercado Pago hace un POST a este webhook enviando una URL con los query params 'id' y 'topic', 
  donde topic puede ser de tipo 'payment' o 'merchant_order', lo importante es definir un comportamiento en base a estos 2 campos
  (ya que el body de la request en algunos casos esta vacio), por lo tanto no tiene sentido obtener su body haciendo req.json().
  Es importante manejar la lógica tanto si 'topic=payment' como si 'topic=merchant_order' ya que a veces topic=payment puede no venir
  debido a errores propios de Mercado Pago, por lo que en estos casos merchant_order termina siendo algo mas confiable.

  La lógica en si es encontrar los pagos que se realizaron y actualizar la orden con los datos del pago.
  Para ello vamos a crear una función handlePayment que se encargara de actualizar la orden con los nuevos campos del pago,
  y en caso de que no venga topic=payment, buscaremos en la merchant_order si existen pagos aprobados,
  en caso de que si le pasamos su id a handlePayment para que actualice los datos. 
  De esta manera manejamos ambos escenarios pero derivamos siempre la lógica de actualizar la orden a una sola función (handlePayment),
  evitando duplicar logica.

  Example URLs sent by Mercado Pago, method: POST
  URL: https://localhost:3000/api/payment/mercado-pago/webhook?id=117032201618&topic=payment
  URL: https://localhost:3000/api/payment/mercado-pago/webhook?id=32102273571&topic=merchant_order

*/


export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const topic = searchParams.get('topic')

    if (!id || !topic) {
      return NextResponse.json({ error: 'parameters id or topic not found' }, { status: 400 })
    }

    if (id && topic === 'payment') {
      return await handlePayment(id)
    }

    if (id && topic === 'merchant_order') {
      return await handleMerchantOrder(id)
    }

    return NextResponse.json({ error: 'unknown topic sent by mp' }, { status: 400 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

// helper to manage a payment received
const handlePayment = async (paymentID: string) => {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentID}`, {
      headers: myHeaders,
    })

    if (!response.ok) {
      const err = await response.json()
      return NextResponse.json({ message: 'mercado pago error', err }, { status: response.status })
    }

    const body = await response.json()
    const check = SimplifiedPaymentMPValidator.safeParse(body)

    if (!check.success) {
      console.error("invalid MP payment payload", check.error);
      return NextResponse.json({ message: 'invalid MP payment payload', error: check.error }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }

    const payment = check.data

    const orderId = payment.external_reference
    const merchantOrderId = payment.order ? payment.order.id : undefined
    const currentPaymentId = payment.id.toString()

    const res = await getOrderByID(orderId)

    if (!res.success || !res.data) {
      return NextResponse.json({ error: res.error }, { status: HttpStatus.NOT_FOUND })
    }

    const currentOrder = res.data

    // ? Validations
    // external_reference debe ser exactamente igual al id de la order
    if (payment.external_reference !== currentOrder._id) {
      console.warn(`Payment ${payment.id} external_reference does not match order ${currentOrder._id}`)
      return NextResponse.json({ error: 'external_reference mismatch' }, { status: HttpStatus.BAD_REQUEST })
    }

    // net_received_amount debe ser !== 0
    // evitar actualizar una orden con un pago que se aprobó pero nunca se acreditó,
    // por errores de cuenta bancaria o retenciones
    if (payment.transaction_details.net_received_amount <= 0) {
      console.warn(`Net received amount is 0 for payment ${payment.id}`)
      return NextResponse.json({ error: 'zero net received amount' }, { status: HttpStatus.BAD_REQUEST })
    }

    // if the order has already been updated with this payment_id, return and do nothing
    if (currentOrder.payment_id === currentPaymentId) {
      console.log(`Payment ${currentPaymentId} already processed for order ${orderId}`)
      return NextResponse.json({}, { status: HttpStatus.OK })
    }

    // data to update order
    const successfullyPayment = payment.status === 'approved' && payment.status_detail === 'accredited'
    const paidAt = successfullyPayment ? new Date(Date.now()).toISOString() : null
    const fee = roundedDecimals(payment.transaction_amount - payment.transaction_details.net_received_amount)

    const threeDaysTTL = new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString()
    const expiresAt = successfullyPayment ? null : threeDaysTTL   // new TTL -> 3 days

    const updateOrder: UpdateOrderFromWebhookType = {
      pay_status: payment.status as PayStatusType,
      pay_status_detail: payment.status_detail,
      payment_id: payment.id.toString(),
      secure_token: randomUUID(),
      merchant_order_id: merchantOrderId,
      fee: fee,
      installments: payment.installments,
      net_received_amount: payment.transaction_details.net_received_amount,
      pay_method: payment.payment_method.id,
      pay_resource: payment.payment_method.type,
      paid_at: paidAt,
      updated_at: new Date(Date.now()).toISOString(),
      expires_at: expiresAt,
    }

    const result = await updateInitialOrder({ id: orderId, data: updateOrder })
    if (!result.success) throw result.error

    return NextResponse.json({}, { status: HttpStatus.OK })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
}

// helper to manage an order received
const handleMerchantOrder = async (orderID: string) => {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    const response = await fetch(`https://api.mercadopago.com/merchant_orders/${orderID}`, {
      headers: myHeaders,
    })

    if (!response.ok) {
      const err = await response.json()
      return NextResponse.json({ message: 'mercado pago error', err }, { status: response.status })
    }

    const body = await response.json()
    const check = MerchantOrderMPValidator.safeParse(body)

    if (!check.success) {
      console.error("error validating merchant_order payload from mercado pago", check.error);
      return NextResponse.json({
        message: 'error validating merchant_order payload from mercado pago',
        error: check.error
      }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
    }

    const merchantOrder = check.data

    // filter approved payments
    const approvedPayments = merchantOrder.payments.find(p =>
      p.status === "approved" && p.status_detail === "accredited"
    )

    if (!approvedPayments) {
      console.log(`Merchant Order ${orderID} received, but no approved/accredited payment found`) // nothing to do
      return NextResponse.json({}, { status: HttpStatus.OK })
    }

    // Derive handlePayment() with found payment_id
    const paymentId = approvedPayments.id.toString()
    return await handlePayment(paymentId)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: HttpStatus.INTERNAL_SERVER_ERROR })
  }
}
