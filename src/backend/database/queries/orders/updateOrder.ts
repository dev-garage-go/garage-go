import { ObjectId } from 'mongodb';
import { getCollection } from '@/backend/database';
import { ServerOrderResponseType } from '@/backend/database/schemas';
import { HttpStatus, ServerActionResponse } from '@/backend/types';

import { ParamsToUpdateOrder, UpdateOrderFromWebhookSchema } from '@/features/orders';
import { zObjectIdSchema } from '@/utils/zod-helpers';

export async function updateOrder({ id, data }: ParamsToUpdateOrder): Promise<ServerActionResponse<ServerOrderResponseType>> {
  try {
    const checkId = zObjectIdSchema.safeParse(id)
    if (!checkId.success) throw checkId.error
    const objectId = new ObjectId(checkId.data)

    const validOrder = UpdateOrderFromWebhookSchema.safeParse(data)
    if (!validOrder.success) throw validOrder.error;

    const newData = validOrder.data

    const coll = await getCollection('orders')
    if (!coll) throw new Error("unexpected error obtaining collection")

    const updatedOrder = await coll.findOneAndUpdate(
      { _id: objectId },
      { $set: newData },
      { returnDocument: "after" }
    )
    if (!updatedOrder) throw new Error("unexpected error getting the new order created")
    const { _id, booking_id, ...rest } = updatedOrder

    const response: ServerOrderResponseType = {
      _id: _id.toString(),
      booking_id: booking_id.toString(),
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