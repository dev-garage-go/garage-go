import { z } from "zod"
import { ObjectId } from "mongodb"
import { getCollection } from "@/backend/database/methods"
import { ServerOrderResponseType } from "@/backend/database/schemas"
import { HttpStatus, ServerActionResponse } from "@/backend/types"

import { zObjectIdSchema } from "@/utils/zod-helpers"

export const findOrderByID = async (id: string): Promise<ServerActionResponse<ServerOrderResponseType>> => {
  try {
    const checkId = zObjectIdSchema.safeParse(id)
    if (!checkId.success) throw checkId.error
    const validId = new ObjectId(id)

    const coll = await getCollection("orders")
    const order = await coll.findOne({ _id: validId })

    if (!order) throw new Error(`the order with id ${id} doesn't exist`)
    const { _id, booking_id, ...rest } = order

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
    console.error(error)
    return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error as string
    }
  }
}

export const findOrderBySecureToken = async (token: string): Promise<ServerActionResponse<ServerOrderResponseType>> => {
  try {
    const checkToken = z.string().uuid().safeParse(token)
    if (!checkToken.success) throw checkToken.error
    const validToken = checkToken.data

    const coll = await getCollection("orders")
    const order = await coll.findOne({ secure_token: validToken })

    if (!order) throw new Error(`the order with token ${token} doesn't exist`)
    const { _id, booking_id, ...rest } = order

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
    console.error(error)
    return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error as string
    }
  }
}