'use server'

import { ServicesData } from "@/interfaces"
import { calcTiresChangeAmount } from "./calcTiresChangeAmount"
import { calcMileageMaintenanceAmount } from "./calcMileageMaintenanceAmount"

export const getServiceAmount = (service: ServicesData): number | undefined => {
  try {
    let total = 0
    switch (service.type) {
      case "mileage":
        total += calcMileageMaintenanceAmount(service)
        break
      case "tires":
        total += calcTiresChangeAmount(service)
        break
      default:
        return undefined
    }

    return total

  } catch (error) {
    console.log(error)
  }
}

export const getServicesAmount = (services: ServicesData[]): number | undefined => {
  try {
    let total = 0

    for (const service of services) {
      switch (service.type) {
        case "mileage":
          // total += calcMileageMaintenanceAmount(service)
          break
        case "tires":
          // total += calcTiresChangeAmount(service)
          break
        default:
          return undefined
      }
    }

    return total

  } catch (error) {
    console.log(error)
  }
}