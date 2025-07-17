import { ObjectId } from 'mongodb';
import { getCollection } from '@/backend/database';
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { DatabaseOrderType, ServerOrderResponseType } from '@/backend/database/schemas';
import { InitialOrderSchema, InitialOrderType } from '@/features/orders';

export async function insertOrder(order: InitialOrderType): Promise<ServerActionResponse<ServerOrderResponseType>> {
  try {
    const validOrder = InitialOrderSchema.safeParse(order)
    if (!validOrder.success) throw validOrder.error;

    const data = validOrder.data
    const { booking_id, ...restData } = data
    const validBookingId = new ObjectId(booking_id)

    const doc: DatabaseOrderType = {
      _id: new ObjectId(),
      booking_id: validBookingId,
      ...restData,
    }

    const coll = await getCollection('orders')
    if (!coll) throw new Error("unexpected error obtaining orders collection")

    const existOrder = await coll.findOne({ booking_id: validBookingId })
    if (existOrder) {
      return {
        success: false,
        error: "the order already exist",
        httpStatus: HttpStatus.CONFLICT
      }
    }

    const result = await coll.insertOne(doc)

    const newOrder = await coll.findOne({ _id: result.insertedId })
    if (!newOrder) throw new Error("unexpected error getting the new order created")
    const { _id: newOrderId, booking_id: bId, ...rest } = newOrder

    const response: ServerOrderResponseType = {
      _id: newOrderId.toString(),
      booking_id: bId.toString(),
      ...rest
    }

    return {
      success: true,
      httpStatus: HttpStatus.CREATED,
      data: response
    }

  } catch (error) {
    console.error("error inserting a new order", error)
    return {
      success: false,
      httpStatus: HttpStatus.BAD_REQUEST,
      error: `error inserting new order: ${error}`
    }
  }
}