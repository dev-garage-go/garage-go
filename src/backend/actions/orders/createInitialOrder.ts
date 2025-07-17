"use server"

import { randomUUID } from "crypto"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { ServerOrderResponseType } from "@/backend/database/schemas"
import { getBaseAmountInCookie, getBookingByID, updateBookingWithOrderID } from "@/backend/actions"
import { insertOrder } from "@/backend/database/queries"

import { InitialOrderType, ParamsToCreateInitialOrder } from "@/features/orders"

export const createInitialOrder = async ({ booking_id, provider }: ParamsToCreateInitialOrder): Promise<ServerActionResponse<ServerOrderResponseType>> => {
  try {
    const amountResponse = await getBaseAmountInCookie()
    if (!amountResponse.success || !amountResponse.data) throw new Error(amountResponse.error)
    const amount = amountResponse.data

    const bookingResponse = await getBookingByID(booking_id)
    if (!bookingResponse.success || !bookingResponse.data) throw new Error(bookingResponse.error)

    const booking = bookingResponse.data
    if (!booking._id) throw new Error("couldn't find the booking id")

    // creates initial order
    const initialOrder: InitialOrderType = {
      provider: provider,                           // mercado-pago | getnet | webpay
      email: booking.user.email,
      secure_token: randomUUID(),
      booking_id: booking._id,                      // payload.booking.id
      external_reference: booking.service.type,     // service type
      subtotal: amount.subtotal,
      disscount: amount.disscount,
      total_price: amount.total,                    // payload.total_price
      pay_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString() // TTL = 1h
    }

    // insert the initial order in database
    const result = await insertOrder(initialOrder)
    if (!result.success || !result.data) throw new Error(result.error)
    const order = result.data

    // set the boooking with order._id
    const response = await updateBookingWithOrderID({ booking_id: booking._id, order_id: order._id })
    if (!response.success) throw response.error

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: order
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