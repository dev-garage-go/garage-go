import { z } from 'zod'
import { ObjectId } from 'mongodb'

import { InitialOrderSchema, UpdateOrderFromWebhookSchema } from '@/features/orders'
import { zObjectIdSchema } from '@/utils/zod-helpers'

// ................................................
export const DatabaseOrderSchema = InitialOrderSchema.merge(UpdateOrderFromWebhookSchema)
  .omit({
    booking_id: true
  })
  .extend({
    _id: z.instanceof(ObjectId),
    booking_id: z.instanceof(ObjectId)
  }).strict()
export type DatabaseOrderType = z.infer<typeof DatabaseOrderSchema>

// ................................................
export const ServerOrderResponseSchema = DatabaseOrderSchema.omit({
  _id: true,
  booking_id: true
}).extend({
  _id: zObjectIdSchema,
  booking_id: zObjectIdSchema
})
export type ServerOrderResponseType = z.infer<typeof ServerOrderResponseSchema>