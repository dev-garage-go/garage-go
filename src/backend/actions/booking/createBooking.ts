'use server'

import { BookingDB, getCollection } from "@/backend/database";
import { ErrorInterface, HttpStatus } from "@/backend/types";
import { BookingServiceDataInterface } from "@/features/bookings";
import { ObjectId } from "mongodb";

export const createBooking = async (booking: BookingServiceDataInterface): Promise<ErrorInterface> => {
  try {
    const coll = await getCollection("bookings")

    // Convert the vehicle id in a mongo ObjectId
    const { vehicleID, ...rest } = booking
    const vehicleObjectId = new ObjectId(vehicleID)

    const validBooking: BookingDB = {
      vehicleID: vehicleObjectId,
      ...rest
    }

    coll.insertOne(validBooking)

    return {
      success: true,
      status: HttpStatus.OK,
      errorMessage: null
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      errorMessage: `Error creating a new booking: ${error}`,
      status: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}