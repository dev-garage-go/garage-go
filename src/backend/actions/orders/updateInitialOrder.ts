'use server'

import { updateOrder } from "@/backend/database/queries"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { OrderDBType, OrderToUpdateSchema, OrderToUpdateType } from "@/features/orders"

export const updateInitialOrder = async (order: OrderToUpdateType): Promise<ServerActionResponse<OrderDBType>> => {
  try {
    const validOrder = OrderToUpdateSchema.safeParse(order)
    if (!validOrder.success || validOrder.data) throw validOrder.error;

    const response = await updateOrder(validOrder)
    if (!response.success || response.data) throw response.error

    const updatedOrder = response.data
    console.log("Updated Order ⚪️ updateInitialOrder", updatedOrder)

    return {
      success: true,
      data: updatedOrder,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error as string
    }
  }
}