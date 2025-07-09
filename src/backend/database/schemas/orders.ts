import { z } from "zod"

export const Order = z.object({
  _id: z.string().uuid().optional(),  // mongo genera este _id
  email: z.string().email(),          // usuario no autenticado
  booking_id: z.string().uuid(),
  external_reference: z.string().optional(),  // referencia para vincular un registro de la app con el gateway
  provider: z.enum(["mercado_pago", "getnet", "webpay_plus"]),
  payment_id: z.string().optional(),          // ID del pago
  merchant_order_id: z.string().optional(),   // ID merchant_order u orden remota
  pay_status: z.enum(["pending", "approved", "rejected", "refunded"]),
  pay_status_detail: z.string().optional(),
  pay_method: z.string().optional(),          // tarjeta, pix, oneclick, etc.
  pay_resource: z.string().optional(),        // wallet, credit_card, bank_transfer
  total_price: z.number().default(0),
  net_received_amount: z.number().optional(),
  installments: z.number().default(0),
  fee: z.number().default(0),
  paid_at: z.date().optional(),               // cuando se completo el pago
  updated_at: z.date().default(new Date()),   // cuando se actualizo por ultima vez
  created_at: z.date().default(new Date()),   // cuando se creo la orden
  expires_at: z.date().default(new Date()),   // TTL
})

export type OrderType = z.infer<typeof Order>