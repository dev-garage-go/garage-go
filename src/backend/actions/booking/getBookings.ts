'use server'

import { BookingDB } from "@/backend/database/types"
import { getCollection } from "@/backend/database/methods"

export const getBookings = async (): Promise<BookingDB[]> => {
  const coll = await getCollection('bookings')
  const bookingsArr = await coll.find().toArray()

  // Convertimos _id de ObjectId a string
  const bookings: BookingDB[] = bookingsArr.map(b => ({
    ...b,
    _id: b._id.toString()
  }))

  return bookings
}
