"use server"

import { findOrderByID } from "@/backend/database/queries"
import { OrderServerResponseType } from "@/backend/database/schemas"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { zObjectIdSchema } from "@/utils/zod-helpers"

export const getOrderByID = async (id: string): Promise<ServerActionResponse<OrderServerResponseType>> => {
  try {
    const checkId = zObjectIdSchema.safeParse(id)
    if (!checkId.success) throw checkId.error

    const result = await findOrderByID(id)
    if (!result.success) throw result.error

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: result.data
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