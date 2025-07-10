"use server"

import { BookingDB, getCollection } from "@/backend/database"
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { ObjectId } from "mongodb";

export const getBookingByID = async (id: string): Promise<ServerActionResponse<BookingDB | null>> => {
  try {
    const coll = await getCollection("bookings")
    const validID = new ObjectId(id)
    const booking = await coll.findOne({ _id: validID })

    return {
      success: true,
      data: booking,
      httpStatus: HttpStatus.OK,
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `error getting collections: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    }
  }
} 