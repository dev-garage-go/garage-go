'use server'

import { ObjectId } from "mongodb";
import { BookingDB, getCollection } from "@/backend/database";
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { getVehicleByID } from "@/backend/actions";

import { BookingServiceDataInterface, BookingWithStringIDInterface } from "@/features/bookings";

export const createBooking = async (booking: BookingServiceDataInterface): Promise<ServerActionResponse<BookingWithStringIDInterface>> => {
  try {
    const coll = await getCollection("bookings")
    if (!coll) throw new Error("error getting bookings collection")

    // Convert the vehicle id in a mongo ObjectId
    const { vehicle_id, ...rest } = booking

    if (!ObjectId.isValid(vehicle_id)) {
      return {
        success: false,
        error: `invalid vehicle id: ${vehicle_id}`,
        httpStatus: HttpStatus.BAD_REQUEST
      }
    }

    const vehicleObjectId = new ObjectId(vehicle_id)

    // Verify is the vehicle exist
    const verifyVehicle = await getVehicleByID(vehicleObjectId)
    if (!verifyVehicle.success) {
      return {
        success: false,
        error: `error: ${verifyVehicle.error} getting the vehicle, with id: ${vehicleObjectId}`,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
      }
    } else if (verifyVehicle.success && !verifyVehicle.data) {
      return {
        success: false,
        error: `vehicle with id: ${vehicleObjectId} doens't exist`,
        httpStatus: HttpStatus.NOT_FOUND
      }
    }

    const validBookingToDB: BookingDB = {
      order_id: null,
      vehicle_id: vehicleObjectId,
      ...rest
    }

    const existBooking = await coll.findOne({ _id: validBookingToDB })
    if (existBooking) return {
      success: false,
      error: "error getting the booking created",
      httpStatus: HttpStatus.CONFLICT
    }

    const result = await coll.insertOne(validBookingToDB)
    if (!result) throw new Error("error creating a booking")

    const bookingCreated = await coll.findOne({ _id: result.insertedId })
    if (!bookingCreated) throw new Error("error getting the booking created")

    // Only plain objects can be passed to Client Components from Server Components
    // Mongo ObjectId are converted to strings
    const { _id: newBookingID, vehicle_id: newBookingVehicleID, ...restBookingCreated } = bookingCreated

    const validBookingToClient: BookingWithStringIDInterface = {
      _id: newBookingID.toString(),
      vehicle_id: newBookingVehicleID.toString(),
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