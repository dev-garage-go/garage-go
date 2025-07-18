"use server"

import { z } from "zod"
import { findOrderBySecureToken } from "@/backend/database/queries"
import { ServerOrderResponseType } from "@/backend/database/schemas"
import { HttpStatus, ServerActionResponse } from "@/backend/types"

export const getOrderBySecureToken = async (token: string): Promise<ServerActionResponse<ServerOrderResponseType>> => {
  try {
    const checkToken = z.string().uuid().safeParse(token)
    if (!checkToken.success) throw checkToken.error
    const validToken = checkToken.data

    const result = await findOrderBySecureToken(validToken)
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