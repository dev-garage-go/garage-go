'use server'

import { AmountInterface } from "@/features/bookings";
import { ServiceChargeInterface } from "@/features/payment";
import { HttpStatus, ServerActionResponse } from '@/backend/types';

export const calcMileageMaintenanceAmount = async (chargeRequest: ServiceChargeInterface): Promise<ServerActionResponse<AmountInterface>> => {
  let subtotal = 0
  let disscount = 0

  console.log(chargeRequest.service)
  console.log(chargeRequest.vehicle)


  try {
    const { service, vehicle } = chargeRequest;

    if (!service) throw new Error("service not exist in the chargeRequest")
    if (!vehicle) throw new Error("vehicle not exist in the chargeRequest")

    switch (vehicle.type) {
      case "City Car / Sedan":
        subtotal = 222186       // $222.186 CL 
        break
      case "SUV / Camioneta":
        subtotal = 263336       // $263.336 CL
        break
      case "Alta gama":
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