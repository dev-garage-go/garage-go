// Docs:
// This function must be use in "booking" services pages, 
// because return the final amount based of vehicle amount (actions/payment/charge/by-vehicle)
// and the service options that the user selected

'use server'

import { calculateMileageCharge } from "./mileage-maintenance"
import { HttpStatus, ServerActionResponse } from "@/backend/types"

import { ServiceChargeInterface, AmountInterface } from "@/features/payment"
import { MileageMaintenanceServiceInterface } from "@/features/services"

// Only one service
export const calculateFinalChargeByService = async (chargeRequest: ServiceChargeInterface): Promise<ServerActionResponse<AmountInterface>> => {
  try {
    const service = chargeRequest.service
    const baseAmount = chargeRequest.baseAmount

    let response: ServerActionResponse<AmountInterface>
    let result: AmountInterface

    switch (service.type) {
      case 'mileage':
        response = await calculateMileageCharge({
          baseAmount,
          service: service as MileageMaintenanceServiceInterface,
        })

        if (!response.success) {
          throw new Error(`error getting final-charge in "${service.type}" service type: ${response.error}`);
        }
        result = response.data!
        break
      default:
        result = { disscount: 0, subtotal: 0, total: 0 }
    }

    if (!result) return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "unexpected error in the final service charge"
    };

    const amount: AmountInterface = {
      subtotal: result.subtotal,
      disscount: 0,           // in the future I will apply the disscount logic
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