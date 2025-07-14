import { getCollection } from '@/backend/database';
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { OrderServerResponseType, OrderToUpdateSchema, OrderToUpdateType } from '@/features/orders';

export async function updateOrder(order: OrderToUpdateType): Promise<ServerActionResponse<OrderServerResponseType>> {
  try {
    const validOrder = OrderToUpdateSchema.safeParse(order)
    if (!validOrder.success) throw validOrder.error;

    const { _id: order_id, ...restOrder } = validOrder.data

    const coll = await getCollection('orders')
    if (!coll) throw new Error("unexpected error inserting a new order")

    const updatedOrder = await coll.findOneAndUpdate(
      { _id: order_id },
      { $set: restOrder }
    )
    if (!updatedOrder) throw new Error("unexpected error getting the new order created")
    console.log("Updated Order ⚪️ updateOrder", updatedOrder)
    const { _id, ...rest } = updatedOrder

    const response: OrderServerResponseType = {
      _id: updatedOrder._id.toString(),
      ...rest
    }

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: response
    }

  } catch (error) {
    console.error(`error ${error} updating order with ID: ${order._id?.toString()}`, error)
    return {
      success: false,
      httpStatus: HttpStatus.BAD_REQUEST,
      error: `error ${error} updating order with ID: ${order._id?.toString()}`
    }
  }
}