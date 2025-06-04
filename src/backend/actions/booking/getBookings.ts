'use server'

import { BookingAdmin } from "@/backend/database/types"
import { getCollection } from "@/backend/database/methods"
import { ErrorInterface, HttpStatus } from "@/backend/interfaces"

export const getBookings = async (): Promise<BookingAdmin[]> => {
  try {
    const bookingColl = await getCollection('bookings')
    const bookingsArr = await bookingColl.find().toArray()

    const vehicleColl = await getCollection('vehicles')

    // Convertimos _id de ObjectId a string
    let bookings: BookingAdmin[] = []

    for (let index = 0; index < bookingsArr.length; index++) {
      const booking = bookingsArr[index];

      const bookingId = booking._id.toString()
      const vehicle = await vehicleColl.findOne({ _id: booking.vehicleID })

      if (!vehicle) throw new Error(`vehicle not found`)

      bookings.push({
        ...booking,
        _id: bookingId,
        vehicle: vehicle
      })
    }

    return bookings

  } catch (error) {
    console.error(error)
    return []
  }

}
