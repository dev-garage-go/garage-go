'use server'

import { BookingDB, getCollection } from "@/backend/database";
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { BookingServiceDataInterface, BookingWithStringIDInterface } from "@/features/bookings";
import { ObjectId } from "mongodb";
import { getVehicleByID } from "../vehicle/getVehicleByID";

export const createBooking = async (booking: BookingServiceDataInterface): Promise<ServerActionResponse<BookingWithStringIDInterface>> => {
  try {
    const coll = await getCollection("bookings")
    if (!coll) throw new Error("error getting bookings collection")

    // Convert the vehicle id in a mongo ObjectId
    const { vehicleID, ...rest } = booking

    if (!ObjectId.isValid(vehicleID)) {
      return {
        success: false,
        error: `Invalid ID format: ${vehicleID}`,
        httpStatus: HttpStatus.BAD_REQUEST
      }
    }

    const vehicleObjectId = new ObjectId(vehicleID)

    // Verify is the vehicle exist
    const verifyVehicle = await getVehicleByID(vehicleObjectId)
    if (!verifyVehicle.success) {
      return {
        success: false,
        error: `error: ${verifyVehicle.error} getting the vehicle, with id: ${vehicleObjectId}`,
        httpStatus: HttpStatus.BAD_REQUEST
      }
    } else if (verifyVehicle.success && !verifyVehicle.data) {
      return {
        success: false,
        error: `The vehicle with ID: ${vehicleObjectId} not exist`,
        httpStatus: HttpStatus.BAD_REQUEST
      }
    }

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