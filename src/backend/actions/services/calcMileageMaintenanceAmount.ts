'use server'

import { AmountInterface } from "@/features/bookings";
import { ServiceChargeInterface } from "@/features/payment";

export const calcMileageMaintenanceAmount = async (chargeRequest: ServiceChargeInterface): Promise<AmountInterface | undefined> => {
  try {
    console.log(chargeRequest.service)
    console.log(chargeRequest.vehicle)

    return {
      subtotal: 1000,
      disscount: 0,
      total: 1000
    }
    
  } catch (error) {
    console.log(error)
  }
}