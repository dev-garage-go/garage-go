'use server'

import { BookingDB, getCollection } from "@/backend/database";
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { BookingServiceDataInterface } from "@/features/bookings";
import { ObjectId } from "mongodb";

export const createBooking = async (booking: BookingServiceDataInterface): Promise<ServerActionResponse<void>> => {
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
      httpStatus: HttpStatus.OK,
      data: null
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