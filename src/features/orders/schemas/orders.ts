import { zISOString } from "@/utils/zod-helpers"
import { z } from "zod"

export const Providers = z.enum(["mercado-pago", "getnet", "webpay"])
export type ProvidersType = z.infer<typeof Providers>

// esquema base
export const OrderDB = z.object({
  _id: z.string().uuid().optional(),  // mongo genera este _id
  email: z.string().email(),          // usuario no autenticado
  booking_id: z.string().uuid(),
  external_reference: z.string().optional(),  // referencia para vincular un registro de la app con el gateway
  provider: Providers,
  payment_id: z.string().optional(),          // ID del pago
  merchant_order_id: z.string().optional(),   // ID merchant_order u orden remota
  pay_status: z.enum(["pending", "approved", "rejected", "refunded"]),
  pay_status_detail: z.string().optional(),
  pay_method: z.string().optional(),          // tarjeta, pix, oneclick, etc.
  pay_resource: z.string().optional(),        // wallet, credit_card, bank_transfer
  total_price: z.number().optional(),
  net_received_amount: z.number().optional(),
  installments: z.number().optional(),
  fee: z.number().optional(),
  paid_at: zISOString().optional(),               // cuando se completo el pago
  updated_at: zISOString(),   // cuando se actualizo por ultima vez
  created_at: zISOString(),   // cuando se creo la orden
  expires_at: zISOString().nullable(),  // TTL
}).strict()

export type OrderDBType = z.infer<typeof OrderDB>

// initial order 
export const InitialOrderSchema = OrderDB.omit({
  _id: true,
  net_received_amount: true,
  paid_at: true,
  fee: true,
  payment_id: true,
  pay_method: true,
  pay_resource: true,
  pay_status_detail: true,
  merchant_order_id: true,
  installments: true,
})

export interface PayloadInitialOrder {
  bookingId: string,
  provider: ProvidersType
}

export type InitialOrderType = z.infer<typeof InitialOrderSchema>

// client request - the client should not send these fields 
export const ClientOrderSchema = OrderDB.omit({
  _id: true,
  net_received_amount: true,
  paid_at: true,
  fee: true,
  created_at: true,
  updated_at: true,
  expires_at: true
})

export type ClientOrderType = z.infer<typeof ClientOrderSchema>