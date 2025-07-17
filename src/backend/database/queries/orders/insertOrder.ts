import { ObjectId } from 'mongodb';
import { getCollection } from '@/backend/database';
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { CreateOrderInputSchema, CreateOrderInputType, FinalOrderType, ServerOrderResponseType } from '@/backend/database/schemas';

export async function insertOrder(order: CreateOrderInputType): Promise<ServerActionResponse<ServerOrderResponseType>> {
  try {
    const validOrder = CreateOrderInputSchema.safeParse(order)
    if (!validOrder.success) throw validOrder.error;

    const data = validOrder.data
    const { booking_id, ...restData } = data

    const doc: FinalOrderType = {
      _id: new ObjectId(),
      booking_id: new ObjectId(booking_id),
      ...restData,
    }

    const coll = await getCollection('orders')
    const result = await coll.insertOne(doc)
    if (!coll || !result) throw new Error("unexpected error inserting a new order")

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
      httpStatus: HttpStatus.OK,
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