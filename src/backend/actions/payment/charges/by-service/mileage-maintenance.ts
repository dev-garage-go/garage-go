'use server'

import { ServiceChargeInterface, AmountInterface } from "@/features/payment";
import { HttpStatus, ServerActionResponse } from '@/backend/types';

export const calculateMileageCharge = async (chargeRequest: ServiceChargeInterface): Promise<ServerActionResponse<AmountInterface>> => {
  let subtotal = 0
  let disscount = 0

  try {
    const { service, baseAmount } = chargeRequest;

    if (!service) throw new Error("service not exist in the chargeRequest")
    if (!baseAmount) throw new Error("base amount not exist in the chargeRequest")

    // note: below would be the logic of charging extra based on the service options the user selected

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