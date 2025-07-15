// order-db.schema.ts
import { z } from 'zod'
import { ObjectId } from 'mongodb'
import { InitialOrderSchema, OrderInputsSchema } from '@/features/orders'

// creás un nuevo schema, omitiendo los _id strings
export const OrderDBSchema = OrderInputsSchema.omit({
  _id: true,
  booking_id: true,
}).extend({
  _id: z.instanceof(ObjectId),
  booking_id: z.instanceof(ObjectId),
})

export type OrderDBType = z.infer<typeof OrderDBSchema>

// --------------------------- · ---------------------------
// server response with _id as string
export const OrderServerResponse = OrderDBSchema.omit({
  _id: true,
  booking_id: true,
}).extend({
  _id: z.string(),
  booking_id: z.string(),
})

export type OrderServerResponseType = z.infer<typeof OrderServerResponse>

// --------------------------- · ---------------------------
// server response with _id as string
export const InitialOrderServerResponse = InitialOrderSchema.omit({
  booking_id: true,
}).extend({
  _id: z.string(),
  booking_id: z.string(),
})

export type InitialOrderServerResponseType = z.infer<typeof InitialOrderServerResponse>