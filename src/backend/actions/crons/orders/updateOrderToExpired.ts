'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { getCollection } from "@/backend/database"

export async function updateOrderToExpired(): Promise<ServerActionResponse<string>> {
  try {
    const coll = await getCollection("orders")
    if (!coll) throw new Error("error finding orders collection")

    const oneHour = 1000 * 60 * 60
    const threeDays = 1000 * 60 * 60 * 72

    const expiredTime = new Date(Date.now() - oneHour)

    const expiredOrders = await coll.find({
      pay_status: 'pending',
      expires_at: expiredTime
    }).toArray()

    if (expiredOrders.length === 0) {
      console.log("Expired orders not found")
      return {
        success: true,
        data: "expired orders not found",
        httpStatus: HttpStatus.NOT_FOUND
      }
    }

    for (const order of expiredOrders) {
      const newTTL = (new Date(Date.now() + threeDays)).toISOString()
      await coll.updateOne(
        { _id: order._id },
        {
          $set: {
            pay_status: 'expired',
            expires_at: newTTL,
            updated_at: new Date().toISOString()
          }
        }
      )
    }

    console.log(`ordenes vencidas actualizadas: ${expiredOrders.length}`)

    return {
      success: true,
      data: `expires orders updated: ${expiredOrders.length}`,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `error in cron job in charge of updating expired orders: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}