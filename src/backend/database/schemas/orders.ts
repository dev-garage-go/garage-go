import { z } from 'zod'
import { ObjectId } from 'mongodb'

import { CreateOrderInputSchema, UpdateOrderFromPaymentSchema } from '@/features/orders'
import { zObjectIdSchema } from '@/utils/zod-helpers'

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