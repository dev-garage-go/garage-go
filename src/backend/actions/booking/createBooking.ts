'use server'

import { BookingDB, getCollection } from "@/backend/database";
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { BookingServiceDataInterface, BookingWithStringIDInterface } from "@/features/bookings";
import { ObjectId } from "mongodb";

export const createBooking = async (booking: BookingServiceDataInterface): Promise<ServerActionResponse<BookingWithStringIDInterface>> => {
  try {
    const coll = await getCollection("bookings")
    if (!coll) throw new Error("error getting bookings collection")

    // Convert the vehicle id in a mongo ObjectId
    const { vehicleID, ...rest } = booking
    const vehicleObjectId = new ObjectId(vehicleID)

    const validBookingToDB: BookingDB = {
      vehicleID: vehicleObjectId,
      ...rest
    }

    const result = await coll.insertOne(validBookingToDB)
    if (!result) throw new Error("error creating a booking")

    const bookingCreated = await coll.findOne({ _id: result.insertedId })
    if (!bookingCreated) throw new Error("error getting the booking created")

    // Only plain objects can be passed to Client Components from Server Components
    // Mongo ObjectId are converted to strings
    const { _id: newBookingID, vehicleID: newBookingVehicleID, ...restBookingCreated } = bookingCreated

    const validBookingToClient: BookingWithStringIDInterface = {
      _id: newBookingID.toString(),
      vehicleID: newBookingVehicleID.toString(),
      ...restBookingCreated
    }

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: validBookingToClient
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `Error creating a new booking: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}