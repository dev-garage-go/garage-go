"use server"

import { getCollection } from "@/backend/database"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { zObjectIdSchema } from "@/utils/zod-helpers"
import { ObjectId } from "mongodb"

interface Params {
  booking_id: string,
  order_id: string
}

export const updateBookingWithOrderID = async ({ booking_id, order_id }: Params): Promise<ServerActionResponse<null>> => {
  try {
    // verify the correct format of IDs
    const checkOrderId = zObjectIdSchema.safeParse(order_id)
    if (!checkOrderId.success) throw new Error(`error validating order id: ${checkOrderId.error}`)
    const orderObjectId = new ObjectId(checkOrderId.data)

    const checkBookingId = zObjectIdSchema.safeParse(booking_id)
    if (!checkBookingId.success) throw new Error(`error validating booking id: ${checkBookingId.error}`)
    const bookingObjectId = new ObjectId(checkBookingId.data)

    // obtain booking and orders collections
    const ordersColl = await getCollection("orders")
    const bookingsColl = await getCollection("bookings")
    if (!ordersColl || !bookingsColl) throw new Error("unexpected error getting bookings or orders collection")

    // if the order exist, update the booking with order_id
    const updatedBooking = await bookingsColl.updateOne(
      { _id: bookingObjectId },
      { $set: { order_id: orderObjectId } },
    )

    if (updatedBooking.modifiedCount === 0) throw new Error(`error updating booking with id: ${booking_id}`)

    return {
      success: true,
      data: null,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error as string,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}