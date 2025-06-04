'use server'

import { BookingAdmin } from "@/backend/database/types"
import { getCollection } from "@/backend/database/methods"

export const getBookingsWithVehicleData = async (): Promise<BookingAdmin[]> => {
  const bookingColl = await getCollection('bookings')
  const vehicleColl = await getCollection('vehicles')

  const bookingsArr = await bookingColl.find().toArray()

  const bookings = await Promise.all(
    bookingsArr.map(async (booking) => {
      const { vehicleID, _id: bId, ...restBooking } = booking

      // search vehicle data using the vehicleID
      const vehicle = await vehicleColl.findOne({ _id: vehicleID })
      if (!vehicle) throw new Error(`vehicle with id: ${vehicleID} not found`)

      const { _id: vId, ...restVehicle } = vehicle;

      // transforms mongo ObjectsId in string
      const validVehicleID = vId.toString()
      const validBookingId = bId.toString()

      return {
        _id: validBookingId,
        vehicle: {
          _id: validVehicleID,
          ...restVehicle
        },
        ...restBooking,
      } satisfies BookingAdmin
    })
  )

  return bookings
}
