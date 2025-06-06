'use server'

import { calculateMileageCharge } from "./mileage-maintenance"
import { calculateTiresChange } from "./tires-change"
import { HttpStatus, ServerActionResponse } from "@/backend/types"

import { AmountInterface } from "@/features/bookings"
import { ServiceChargeInterface } from "@/features/payment"
import { MileageMaintenanceServiceInterface, TiresChangeServiceInterface } from "@/features/services"

// Only one service
export const calculateServiceCharge = async (chargeRequest: ServiceChargeInterface): Promise<ServerActionResponse<AmountInterface>> => {
  try {
    const service = chargeRequest.service
    const vehicle = chargeRequest.vehicle

    let response: ServerActionResponse<AmountInterface>
    let result: AmountInterface

    switch (service.type) {
      case 'mileage':
        response = await calculateMileageCharge({
          vehicle,
          service: service as MileageMaintenanceServiceInterface,
        })

        if (!response.success) {
          throw new Error(`error getting charge in "${service.type}" service type: ${response.error}`);
        }
        result = response.data!
        break

      case 'tires':
        response = await calculateTiresChange(service as TiresChangeServiceInterface)
        if (!response.success) {
          throw new Error(`error getting charge in "${service.type}" service type: ${response.error}`);
        }
        result = response.data!

        break
      default:
        result = { disscount: 0, subtotal: 0, total: 0 }
    }

    if (!result) return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "unexpected error charging service"
    };

    const amount: AmountInterface = {
      subtotal: result.subtotal,
      disscount: 0, // aplicá lógica de descuentos más adelante
      total: result.subtotal // de momento, total == subtotal
    }

    console.log('amount', amount)
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


// ? Multiple services
// export const getServicesAmount = async (services: ServicesDataType[]): Promise<AmountInterface | undefined> => {
//   try {
//     let result: { subtotal: number } | undefined

//     for (const service of services) {
//       switch (service.type) {
//         case 'mileage':
//           result = await calcMileageMaintenanceAmount(service as MileageMaintenanceServiceInterface)
//           break
//         case 'tires':
//           result = await calcTiresChangeAmount(service as TiresChangeServiceInterface)
//           break
//         default:
//           return undefined
//       }
//     }

//     if (!result) return undefined
//     const amount: AmountInterface = {
//       subtotal: result.subtotal,
//       disscount: 0,
//       total: result.subtotal
//     }

//     console.log('amount', amount)
//     return amount

//   } catch (error) {
//     console.log(error)
//   }
// }