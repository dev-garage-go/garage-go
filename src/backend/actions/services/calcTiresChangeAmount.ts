'use server'

import { AmountInterface } from "@/features/bookings"
import { TiresChangeServiceInterface } from "@/features/services"
import { ServerActionResponse } from '../../types/server-action-response';
import { HttpStatus } from "@/backend/types";


export const calcTiresChangeAmount = async (service: TiresChangeServiceInterface): Promise<ServerActionResponse<AmountInterface | null>> => {
  try {
    let subtotal = 0
    let disscount = 0
    console.log(service)

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