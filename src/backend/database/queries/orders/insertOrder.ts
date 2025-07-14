import { getCollection } from '@/backend/database';
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { InitialOrderType, OrderDB, OrderServerResponseType } from '@/features/orders';

export async function insertOrder(order: InitialOrderType): Promise<ServerActionResponse<OrderServerResponseType>> {
  try {
    const validOrder = OrderDB.safeParse(order)
    if (!validOrder.success) throw validOrder.error;

    const doc = validOrder.data

    const coll = await getCollection('orders')
    const result = await coll.insertOne(doc)
    if (!coll || !result) throw new Error("unexpected error inserting a new order")

    const newOrder = await coll.findOne({ _id: result.insertedId })
    if (!newOrder) throw new Error("unexpected error getting the new order created")
    const { _id, ...rest } = newOrder

    const response: OrderServerResponseType = {
      _id: newOrder._id.toString(),
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