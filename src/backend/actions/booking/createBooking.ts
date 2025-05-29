'use server'

import { getCollection } from "@/backend/database/methods";
import { BookingServiceData, ErrorInterface, HttpStatus } from "@/interfaces";

export const createBooking = async (booking: BookingServiceData): Promise<ErrorInterface> => {
  try {
    const coll = await getCollection("bookings")
    coll.insertOne(booking)

    console.log("Booking added in database")
    return {
      success: true,
      status: HttpStatus.OK,
      errorMessage: null
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      errorMessage: `Error creating a new booking: ${error}`,
      status: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}