import { z } from "zod"
import { zISOString, zObjectIdSchema } from "@/utils/zod-helpers"

export const Providers = z.enum(["mercado-pago", "getnet", "webpay"])
export type ProvidersType = z.infer<typeof Providers>

export const PayStatus = z.enum(["approved", "in_process", "pending", "authorized", "cancelled", "refunded", "charged_back", "rejected"])
export type PayStatusType = z.infer<typeof PayStatus>

export const PayStatusDetail = z.enum(["accredited", "pending_capture", "partially_refunded", "expired", "in_process", "bank_error", "cc_rejected_blacklist"])
export type PayStatusDetailType = z.infer<typeof PayStatusDetail>


// --------------------------- · ---------------------------
// schema de inputs que se ira completando en la orden del lado cliente
export const OrderInputsSchema = z.object({
  _id: zObjectIdSchema.optional(),  // mongo genera este _id
  email: z.string().email(),          // usuario no autenticado
  booking_id: zObjectIdSchema,
  external_reference: z.string().optional(),  // referencia para vincular un registro de la app con el gateway
  provider: Providers,
  payment_id: z.string().optional(),          // ID del pago
  merchant_order_id: z.string().optional(),   // ID merchant_order u orden remota
  pay_status: PayStatus,
  pay_status_detail: z.string().optional(),
  pay_method: z.string().optional(),          // tarjeta, pix, oneclick, etc.
  pay_resource: z.string().optional(),        // wallet, credit_card, bank_transfer
  total_price: z.number().optional(),
  net_received_amount: z.number().optional(),
  installments: z.number().optional(),
  fee: z.number().optional(),
  paid_at: zISOString.optional().nullable(),               // cuando se completo el pago
  updated_at: zISOString,   // cuando se actualizo por ultima vez
  created_at: zISOString,   // cuando se creo la orden
  expires_at: zISOString.nullable(),  // TTL
}).strict()

export type OrderInputsType = z.infer<typeof OrderInputsSchema>


// --------------------------- · ---------------------------
// initial order 
export const InitialOrderSchema = OrderInputsSchema.omit({
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
}).strict()

export interface PayloadInitialOrder {
  booking_id: string,
  provider: ProvidersType
}

export type InitialOrderType = z.infer<typeof InitialOrderSchema>


// --------------------------- · ---------------------------
// ! order updated by gateway response
export const OrderToUpdateSchema = OrderInputsSchema.omit({
  booking_id: true,
  email: true,
  provider: true,
  external_reference: true,
  total_price: true,
  created_at: true
})

export type OrderToUpdateType = z.infer<typeof OrderToUpdateSchema>