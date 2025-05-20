'use server'

import { connectDatabase } from "@/database/connect";
import { getCollection } from "@/database/methods";
import { BookingServiceData } from "@/interfaces";

export const createBooking = async (booking: BookingServiceData) => {
  try {
    const conn = await connectDatabase()
    if (!conn) return

    const coll = await getCollection("bookings")
    coll.insertOne(booking)

    console.log("Llego a insertar")
  } catch (error) {
    console.error(error)
  }
}