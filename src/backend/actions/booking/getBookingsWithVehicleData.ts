'use server'

import { BookingAdmin } from "@/backend/database/types"
import { getCollection } from "@/backend/database/methods"
import { HttpStatus, ServerActionResponse } from "@/backend/types";

import { getBookings } from "./getBookings"

export const getBookingsWithVehicleData = async (): Promise<ServerActionResponse<BookingAdmin[]>> => {
  try {
    const response = await getBookings();
    if (!response.success) throw new Error(response.error);

    const rawBookings = response.data
    const vehicleColl = await getCollection('vehicles');

    if (!rawBookings) throw new Error("error: bookings not founded");

    const bookings = await Promise.all(
      rawBookings.map(async (booking) => {
        const { vehicle_id, _id: bId, ...restBooking } = booking

        // search vehicle data using the vehicleID
        const vehicle = await vehicleColl.findOne({ _id: vehicle_id })
        if (!vehicle) throw new Error(`vehicle with id: ${vehicle_id} not found`)

        const { _id: vId, ...restVehicle } = vehicle;

        // transforms mongo ObjectsId in string
        const validVehicleID = vId.toString()
        const validBookingId = bId!.toString()

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

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: bookings
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `something was wrong obtaining the admin bookings: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}
