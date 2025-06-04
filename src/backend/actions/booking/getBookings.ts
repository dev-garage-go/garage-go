"use server"

import { BookingDB, getCollection } from "@/backend/database"
import { HttpStatus, ServerActionResponse } from '@/backend/types';

export const getBookings = async (): Promise<ServerActionResponse<BookingDB[] | null>> => {
  try {
    const coll = await getCollection("bookings")
    const bookings = await coll.find().toArray()

    return {
      success: true,
      data: bookings,
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