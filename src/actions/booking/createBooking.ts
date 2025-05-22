'use server'

import { getCollection } from "@/database/methods";
import { BookingServiceData, ErrorMessage } from "@/interfaces";

export const createBooking = async (booking: BookingServiceData): Promise<ErrorMessage> => {
  try {
    const coll = await getCollection("bookings")
    coll.insertOne(booking)

    console.log("Booking added in database")
    return { errorMessage: null }
  } catch (error) {
    console.error(error)
    return { errorMessage: `something went wrong: ${error}` }
  }
}