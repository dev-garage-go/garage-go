"use server"

import { InitialOrderType, PayloadInitialOrder } from "@/features/orders"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { getBaseAmountInCookie, getBookingByID } from "@/backend/actions"
import { insertOrder } from "@/backend/database/queries"

export const createInitialOrder = async ({ bookingId, provider }: PayloadInitialOrder): Promise<ServerActionResponse<InitialOrderType>> => {
  try {
    const amountResponse = await getBaseAmountInCookie()
    if (!amountResponse.success || !amountResponse.data) throw new Error(amountResponse.error)
    const amount = amountResponse.data

    const bookingResponse = await getBookingByID(bookingId)
    if (!bookingResponse.success || !bookingResponse.data) throw new Error(bookingResponse.error)

    const booking = bookingResponse.data
    if (!booking._id) throw new Error("couldn't find the booking id")

    const initialOrder: InitialOrderType = {
      provider: provider,                           // mercado-pago | getnet | webpay
      email: booking.user.email,
      booking_id: booking._id.toString(),           // payload.booking.id
      external_reference: booking.service.type,     // service type
      total_price: amount.total,                    // payload.total_price
      pay_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString() // TTL = 1h
    }

    const result = await insertOrder(initialOrder)
    if (!result.success || !result.data) throw new Error(result.error)
    const { _id, ...rest } = result.data

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: rest
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