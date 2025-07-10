import { getCollection } from '@/backend/database';
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { InitialOrderType, OrderDB, OrderDBType } from '@/features/orders';

export async function insertOrder(order: InitialOrderType): Promise<ServerActionResponse<OrderDBType>> {
  try {
    const validOrder = OrderDB.safeParse(order)
    if (!validOrder.success) throw validOrder.error;

    const doc = validOrder.data

    const coll = await getCollection('orders')
    const result = await coll.insertOne(doc)

    if (!coll || !result) throw new Error("unexpected error inserting a new order")
    const newOrder = await coll.findOne({ _id: result.insertedId })

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: newOrder
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