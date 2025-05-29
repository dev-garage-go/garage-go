'use server'

import { BookingDB } from "@/backend/database/interfaces"
import { getCollection } from "@/backend/database/methods"
import { ObjectId } from "mongodb"

type RawBooking = Omit<BookingDB, "_id"> & { _id: ObjectId }

export const getBookings = async (): Promise<BookingDB[]> => {
  const rawBookings = await (await getCollection<RawBooking>('bookings')).find().toArray()

  // Convertimos _id de ObjectId a string
  const bookings: BookingDB[] = rawBookings.map(b => ({
    ...b,
    _id: b._id.toString()
  }))

  return bookings
}
