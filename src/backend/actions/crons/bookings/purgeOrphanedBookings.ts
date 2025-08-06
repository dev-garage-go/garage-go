'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { getCollection } from "@/backend/database"

// This cron jobs clean and delete from database the bookings without order_id

export async function purgeOrphanedBookings(): Promise<ServerActionResponse<string>> {
  try {
    const bookingsColl = await getCollection("bookings")
    if (!bookingsColl) throw new Error("error getting booking collection")

    const oneAndHalfHour = 1000 * 60 * 90 // 1.30 h
    const expiredTime = new Date(Date.now() - oneAndHalfHour).toISOString()

    const bookingsToDelete = await bookingsColl.find({
      order_id: null,
      expires_at: { $lt: expiredTime }
    }).toArray()

    if (bookingsToDelete.length === 0) {
      console.log('orphaned bookings not found')
      return {
        success: true,
        data: 'orphaned bookings not found',
        httpStatus: HttpStatus.NOT_FOUND
      }
    }

    let deletedBookings = 0

    // deletes orphaned bookings
    for (const booking of bookingsToDelete) {
      const bookingId = booking._id
      const bookingDeleted = await bookingsColl.deleteOne({ _id: bookingId })
      deletedBookings += bookingDeleted.deletedCount ?? 0
    }

    console.log(`reservas purgadas: ${deletedBookings}`)

    return {
      success: true,
      data: `orphaned bookings purged: ${deletedBookings}`,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `error in cron job in charge of purge orphaned bookings: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}