import { z } from "zod"
import { zISOString, zObjectIdSchema } from "@/utils/zod-helpers"

export const Providers = z.enum(["mercado-pago", "getnet", "webpay"])
export type ProvidersType = z.infer<typeof Providers>

export const PayStatus = z.enum(["approved", "in_process", "pending", "authorized", "cancelled", "refunded", "charged_back", "rejected", "expired", "soft-detele"])
export type PayStatusType = z.infer<typeof PayStatus>

export const PayStatusDetail = z.enum(["accredited", "pending_capture", "partially_refunded", "expired", "in_process", "bank_error", "cc_rejected_blacklist"])
export type PayStatusDetailType = z.infer<typeof PayStatusDetail>

export const Currencies = z.enum(["ARS", "CLP"])
export type CurrenciesType = z.infer<typeof Currencies>

// ? Disccount types
// percentage = subtotal * (15 / 100)
// fixed = $500
// bundle = 2x1, 3x2, Pack de 3 servicios a $X
export const DisscountTypes = z.enum(["percentage", "bundle", "fixed"])
export type DisscountTypesType = z.infer<typeof DisscountTypes>


// ................................................
export interface ParamsToCreateInitialOrder {
  booking_id: string,
  provider: ProvidersType
}

export const InitialOrderSchema = z.object({
  provider: Providers,
  email: z.string().email(),
  booking_id: zObjectIdSchema,
  secure_token: z.string().uuid(),
  external_reference: z.string(),
  currency: Currencies.optional().default("CLP").optional(),   // TODO: implementar en el futuro, detectando el pais del usuario con su IP
  subtotal: z.number(),
  disscount: z.number(),
  disccount_type: DisscountTypes.optional(),                   // TODO: implementar en el futuro
  total_price: z.number(),
  pay_status: PayStatus.default("pending"),
  created_at: zISOString,
  updated_at: zISOString,
  expires_at: zISOString,
}).strict();
export type InitialOrderType = z.infer<typeof InitialOrderSchema>

// ................................................
export interface ParamsToUpdateOrder {
  id: string,
  data: UpdateOrderFromWebhookType
}

export const UpdateOrderFromWebhookSchema = z.object({
  payment_id: z.string().optional(),
  merchant_order_id: z.string().optional(),
  pay_status: PayStatus,
  pay_status_detail: z.string().optional(),
  pay_method: z.string().optional(),
  pay_resource: z.string().optional(),
  net_received_amount: z.number().optional(),
  installments: z.number().optional(),
  fee: z.number().optional(),
  paid_at: zISOString.optional().nullable(),
  updated_at: zISOString,
  expires_at: zISOString.nullable(),
}).strict();
export type UpdateOrderFromWebhookType = z.infer<typeof UpdateOrderFromWebhookSchema>