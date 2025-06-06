'use server'

import { AmountInterface } from "@/features/bookings";
import { HttpStatus, ServerActionResponse } from '@/backend/types';
import { VehicleWithStringIDInterface } from "@/features/vehicle";

export const calculateMileageChargeByVehicle = async (vehicle: VehicleWithStringIDInterface): Promise<ServerActionResponse<AmountInterface>> => {
  let subtotal = 0
  let disscount = 0

  try {
    if (!vehicle) throw new Error("vehicle not exist in the charge request")

    switch (vehicle.type) {
      case "city car / sedan":
        subtotal = 222186       // $222.186 CL 
        break
      case "suv / camioneta":
        subtotal = 263336       // $263.336 CL
        break
      case "alta gama":
        subtotal = 440533       // $440.533 CL
        break
      default: 0
    }

    const amount: AmountInterface = {
      subtotal: subtotal,
      disscount: 0,
      total: subtotal - disscount
    }

    return {
      success: true,
      data: amount,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error as string,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}