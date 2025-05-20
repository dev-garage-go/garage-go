'use server'

import { getCollection } from "@/database/methods"

export const getBookings = async () => {
  const coll = await getCollection('bookings')
  return coll
}