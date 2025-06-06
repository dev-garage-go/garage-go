// Docs:
// This function must be use in "contrating" services pages, 
// because return a initial amount based of vehicle type

'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types"

import { AmountInterface } from "@/features/bookings"
import { BaseChargeByVehicle } from "@/features/payment"
import { calculateMileageChargeByVehicle } from "./mileage-maintenance"

// Only one service
export const calculateBaseChargeByVehicle = async (chargeRequest: BaseChargeByVehicle): Promise<ServerActionResponse<AmountInterface>> => {
  try {
    const serviceType = chargeRequest.serviceType
    const vehicle = chargeRequest.vehicle

    let response: ServerActionResponse<AmountInterface>
    let result: AmountInterface

    switch (serviceType) {
      case 'mileage':
        response = await calculateMileageChargeByVehicle(vehicle)
        if (!response.success) {
          throw new Error(`error getting vehicle-base charging in "${serviceType}" service type: ${response.error}`);
        }
        result = response.data!
        break
      default:
        result = { disscount: 0, subtotal: 0, total: 0 }
    }

    if (!result) return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "unexpected error in vehicle-based charging"
    };

    const amount: AmountInterface = {
      subtotal: result.subtotal,
      disscount: result.disscount,
      total: result.subtotal
    }

    return {
      success: true,
      data: amount,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error as string,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}