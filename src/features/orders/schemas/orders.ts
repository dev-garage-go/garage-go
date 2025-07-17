import { z } from "zod"
import { zISOString, zObjectIdSchema } from "@/utils/zod-helpers"

export const Providers = z.enum(["mercado-pago", "getnet", "webpay"])
export type ProvidersType = z.infer<typeof Providers>

export const PayStatus = z.enum(["approved", "in_process", "pending", "authorized", "cancelled", "refunded", "charged_back", "rejected"])
export type PayStatusType = z.infer<typeof PayStatus>

export const PayStatusDetail = z.enum(["accredited", "pending_capture", "partially_refunded", "expired", "in_process", "bank_error", "cc_rejected_blacklist"])
export type PayStatusDetailType = z.infer<typeof PayStatusDetail>


// ................................................
export interface PayloadInitialOrder {
  booking_id: string,
  provider: ProvidersType
}

export const CreateOrderInputSchema = z.object({
  provider: Providers,
  email: z.string().email(),
  booking_id: zObjectIdSchema,
  external_reference: z.string(),
  total_price: z.number(),
  pay_status: PayStatus.default("pending"),
  created_at: zISOString,
  updated_at: zISOString,
  expires_at: zISOString,
}).strict();
export type CreateOrderInputType = z.infer<typeof CreateOrderInputSchema>

// ................................................
export const UpdateOrderFromPaymentSchema = z.object({
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
export type UpdateOrderFromPaymentType = z.infer<typeof UpdateOrderFromPaymentSchema>