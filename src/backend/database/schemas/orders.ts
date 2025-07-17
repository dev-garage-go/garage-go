// order-db.schema.ts
import { z } from 'zod'
import { ObjectId } from 'mongodb'
import { PayStatus, Providers } from '@/features/orders'
import { zISOString, zObjectIdSchema } from '@/utils/zod-helpers'

// ................................................
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

// ................................................
export const FinalOrderSchema = CreateOrderInputSchema.merge(UpdateOrderFromPaymentSchema)
  .omit({
    booking_id: true
  })
  .extend({
    _id: z.instanceof(ObjectId),
    booking_id: z.instanceof(ObjectId)
  }).strict()
export type FinalOrderType = z.infer<typeof FinalOrderSchema>

// ................................................
export const ServerOrderResponseSchema = FinalOrderSchema.omit({
  _id: true,
  booking_id: true
}).extend({
  _id: zObjectIdSchema,
  booking_id: zObjectIdSchema
})
export type ServerOrderResponseType = z.infer<typeof ServerOrderResponseSchema>