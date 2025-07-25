'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { getCollection } from "@/backend/database"

export async function updateOrderToSoftDelete(): Promise<ServerActionResponse<string>> {
  try {
    const coll = await getCollection("orders")
    if (!coll) throw new Error("error finding orders collection")

    const threeDays = 1000 * 60 * 60 * 72
    const fourtyFiveDays = 1000 * 60 * 60 * 24 * 45   // 45 days

    const expiredTime = new Date(Date.now() - threeDays)

    const expiredOrders = await coll.find({
      pay_status: 'expired',
      expires_at: expiredTime
    }).toArray()

    if (expiredOrders.length === 0) {
      console.log('orders with "expired" status not found')
      return {
        success: true,
        data: "expired orders not found",
        httpStatus: HttpStatus.NOT_FOUND
      }
    }

    for (const order of expiredOrders) {
      const newTTL = (new Date(Date.now() + fourtyFiveDays)).toISOString()
      await coll.updateOne(
        { _id: order._id },
        {
          $set: {
            pay_status: 'soft-detele',
            expires_at: newTTL,
            updated_at: new Date().toISOString()
          }
        }
      )
    }

    console.log(`ordenes vencidas marcadas como soft-delete: ${expiredOrders.length}`)

    return {
      success: true,
      data: `expires orders marks as soft-delete: ${expiredOrders.length}`,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `error in cron job in charge of mark expired orders as soft-delete: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}