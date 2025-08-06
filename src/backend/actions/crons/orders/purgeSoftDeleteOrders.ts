'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { getCollection } from "@/backend/database"

export async function purgeSoftDeleteOrders(): Promise<ServerActionResponse<string>> {
  try {
    const ordersColl = await getCollection("orders")
    const bookingsColl = await getCollection("bookings")
    if (!ordersColl || !bookingsColl) throw new Error("error finding collections")

    const fourtyFiveDays = 1000 * 60 * 60 * 24 * 45   // 45 days
    const expiredTime = new Date(Date.now() - fourtyFiveDays).toISOString()

    const ordersToDelete = await ordersColl.find({
      pay_status: 'soft-delete',
      expires_at: { $lt: expiredTime }
    }).toArray()

    if (ordersToDelete.length === 0) {
      console.log('orders with "soft-delete" status not found')
      return {
        success: true,
        data: 'orders with "soft-delete" status not found',
        httpStatus: HttpStatus.NOT_FOUND
      }
    }

    let deletedOrders = 0
    let deletedBookings = 0

    // deletes booking joined order, and order too
    for (const order of ordersToDelete) {
      const bookingId = order.booking_id

      const orderDeleted = await ordersColl.deleteOne({ _id: order._id })
      const bookingDeleted = await bookingsColl.deleteOne({ _id: bookingId })

      deletedOrders += orderDeleted.deletedCount ?? 0
      deletedBookings += bookingDeleted.deletedCount ?? 0
    }

    console.log(`ordenes purgadas: ${deletedOrders}`)
    console.log(`reservas purgadas: ${deletedBookings}`)

    return {
      success: true,
      data: `orders purged: ${deletedOrders}, bookings purged: ${deletedBookings}`,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `error in cron job in charge of purge soft-delete orders: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}