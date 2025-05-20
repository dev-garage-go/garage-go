'use server'

import { MileageMaintenanceService, ServicesData, TiresChangeService } from "@/interfaces"
import { calcTiresChangeAmount, calcMileageMaintenanceAmount } from "@/actions"

// Only one service
export const getServiceAmount = (service: ServicesData): number | undefined => {
  try {
    let total = 0
    switch (service.type) {
      case 'mileage':
        total += calcMileageMaintenanceAmount(service as MileageMaintenanceService)
        break
      case "tires":
        total += calcTiresChangeAmount(service as TiresChangeService)
        break
      default:
        return undefined
    }

    console.log('total', total)
    return total

  } catch (error) {
    console.log(error)
  }
}

// Multiple services
export const getServicesAmount = (services: ServicesData[]): number | undefined => {
  try {
    let total = 0

    for (const service of services) {
      switch (service.type) {
        case "mileage":
          total += calcMileageMaintenanceAmount(service as MileageMaintenanceService)
          break
        case "tires":
          total += calcTiresChangeAmount(service as TiresChangeService)
          break
        default:
          return undefined
      }
    }

    console.log('total', total)
    return total

  } catch (error) {
    console.log(error)
  }
}