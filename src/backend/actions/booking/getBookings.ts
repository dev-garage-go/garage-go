'use server'

import { BookingAdmin, VehicleDB } from "@/backend/database/types"
import { getCollection } from "@/backend/database/methods"
import { ErrorInterface, HttpStatus } from "@/backend/interfaces"

// export const getBookings = async (): Promise<BookingAdmin[]> => {
//   const bookingColl = await getCollection('bookings')
//   const bookingsArr = await bookingColl.find().toArray()

//   const vehicleColl = await getCollection('vehicles')

//   // Convertimos _id de ObjectId a string
//   let bookings: BookingAdmin[] = []

//   for (let index = 0; index < bookingsArr.length; index++) {
//     const booking = bookingsArr[index];

//     const bookingId = booking._id.toString()
//     const vehicle = await vehicleColl.findOne({ _id: booking.vehicleID.toString() })

//     if (!vehicle) throw new Error(`vehicle not found`)

//     bookings.push({
//       ...booking,
//       _id: bookingId,
//       vehicle: vehicle
//     })
//   }

//   return bookings
// }
export const getBookings = async (): Promise<BookingAdmin[]> => {
  const bookingColl = await getCollection('bookings')
  const bookingsArr = await bookingColl.find().toArray()

  const vehicleColl = await getCollection('vehicles')

  const bookings = await Promise.all(
    bookingsArr.map(async (booking) => {
      const { vehicleID, ...rest } = booking

      const vehicle = await vehicleColl.findOne({ _id: vehicleID })

      if (!vehicle) throw new Error(`vehicle with id: ${vehicleID} not found`)

      return {
        ...rest,
        _id: booking._id.toString(),
        vehicle: vehicle,
      } satisfies BookingAdmin
    })
  )


  return bookings
}
