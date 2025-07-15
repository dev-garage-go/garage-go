import { getCollection } from '@/backend/database';
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { OrderServerResponseType, OrderToUpdateSchema, OrderToUpdateType } from '@/features/orders';
import { zObjectIdSchema } from '@/utils/zod-helpers';

interface Params {
  id: string,
  data: OrderToUpdateType
}

export async function updateOrder({ id, data }: Params): Promise<ServerActionResponse<OrderServerResponseType>> {
  try {
    const checkId = zObjectIdSchema.safeParse(id)
    if (!checkId.success) throw checkId.error

    const validOrder = OrderToUpdateSchema.safeParse(data)
    if (!validOrder.success) throw validOrder.error;

    const newData = validOrder.data

    const coll = await getCollection('orders')
    if (!coll) throw new Error("unexpected error obtaining collection")

    const updatedOrder = await coll.findOneAndUpdate(
      { _id: id },
      { $set: newData }
    )
    if (!updatedOrder) throw new Error("unexpected error getting the new order created")
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
    console.error(`error ${error} updating order with ID: ${id.toString()}`, error)
    return {
      success: false,
      httpStatus: HttpStatus.BAD_REQUEST,
      error: `error ${error} updating order with ID: ${id.toString()}`
    }
  }
}

/*
    const updatedOrder = await coll.findOneAndUpdate(
      { _id: id },
      { $set: newData }
    )
    if (!updatedOrder) throw new Error("unexpected error getting the new order created")
    const { _id, ...rest } = updatedOrder
*/