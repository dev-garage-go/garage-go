'use server'

import { updateOrder } from "@/backend/database/queries"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { OrderToUpdateSchema, OrderToUpdateType } from "@/features/orders"

interface Params {
  id: string,
  data: OrderToUpdateType
}

export const updateInitialOrder = async ({ id, data }: Params): Promise<ServerActionResponse<null>> => {
  try {
    const check = OrderToUpdateSchema.safeParse(data)
    if (!check.success || !check.data) throw check.error;
    const newData = check.data

    const response = await updateOrder({ id, data: newData })
    if (!response.success || !response.data) throw response.error

    return {
      success: true,
      data: null,
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