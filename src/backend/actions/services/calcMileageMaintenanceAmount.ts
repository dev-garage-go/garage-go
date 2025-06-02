'use server'

import { Amount } from "@/features/bookings";
import { MileageMaintenanceServiceInterface } from "@/features/services";

export const calcMileageMaintenanceAmount = async (service: MileageMaintenanceServiceInterface): Promise<Amount | undefined> => {
  try {
    console.log(service)

    return {
      subtotal: 1000,
      disscount: 0,
      total: 1000
    }

  } catch (error) {
    console.log(error)
  }
}