"use server"

import { BookingResponse, getCollection } from "@/backend/database"
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { ObjectId } from "mongodb";

export const getBookingByID = async (id: string): Promise<ServerActionResponse<BookingResponse | null>> => {
  try {
    const validID = new ObjectId(id)
    const coll = await getCollection("bookings")
    if (!coll) throw new Error('error getting bookings collection')

    const booking = await coll.findOne({ _id: validID })
    if (!booking) throw new Error('error getting booking by id')
    const { _id, vehicleID, ...rest } = booking

    const bookingResponse: BookingResponse = {
      _id: booking._id.toString(),
      vehicleID: booking.vehicleID.toString(),
      ...rest
    }

    return {
      success: true,
      data: bookingResponse,
      httpStatus: HttpStatus.OK,
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `unexpected error getting booking: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    }
  }
} 