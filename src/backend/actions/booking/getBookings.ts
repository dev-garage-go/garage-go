"use server"

import { BookingDB, getCollection } from "@/backend/database"

export const getBookings = async (): Promise<BookingDB[] | null> => {
  try {
    const coll = await getCollection("bookings")
    const bookings = coll.find().toArray()
    return bookings
    
  } catch (error) {
    console.error(error)
    return null
  }
} 