'use server'

import { calcTiresChangeAmount, calcMileageMaintenanceAmount } from "@/backend/actions"

import { AmountInterface } from "@/features/bookings"
import { ServiceChargeInterface } from "@/features/payment"
import { MileageMaintenanceServiceInterface, TiresChangeServiceInterface } from "@/features/services"

// Only one service
export const getServiceAmount = async (chargeRequest: ServiceChargeInterface): Promise<AmountInterface | undefined> => {
  try {
    const service = chargeRequest.service
    const vehicle = chargeRequest.vehicle

    let result: { subtotal: number } | undefined

    switch (service.type) {
      case 'mileage':
        result = await calcMileageMaintenanceAmount(service as MileageMaintenanceServiceInterface)
        break
      case 'tires':
        result = await calcTiresChangeAmount(service as TiresChangeServiceInterface)
        break
      default:
        return undefined
    }

    if (!result) return undefined
    const amount: AmountInterface = {
      subtotal: result.subtotal,
      disscount: 0, // aplicá lógica de descuentos más adelante
      total: result.subtotal // de momento, total == subtotal
    }

    console.log('amount', amount)
    return amount

  } catch (error) {
    console.error('Error en getServiceAmount:', error)
    return undefined
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