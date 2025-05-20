'use server'

import { Amount, MileageMaintenanceService, ServicesData, TiresChangeService } from "@/interfaces"
import { calcTiresChangeAmount, calcMileageMaintenanceAmount } from "@/actions"

// Only one service
export const getServiceAmount = async (service: ServicesData): Promise<Amount | undefined> => {
  try {
    let subtotal = 0
    let disscount = 0
    let total = 0

    switch (service.type) {
      case 'mileage':
        const res = await calcMileageMaintenanceAmount(service as MileageMaintenanceService)
        if (!res) return
        subtotal += res.subtotal
        disscount += res.subtotal
        total += res.subtotal
        break
      case "tires":
        total += calcTiresChangeAmount(service as TiresChangeService)
        break
      default:
        return undefined
    }

    const amount: Amount = {
      subtotal: subtotal,
      disscount: disscount,
      total: total
    }

    console.log('amount', amount)
    return amount

  } catch (error) {
    console.log(error)
  }
}

// Multiple services
export const getServicesAmount = async (services: ServicesData[]): Promise<Amount | undefined> => {
  try {
    let subtotal = 0
    let disscount = 0
    let total = 0

    for (const service of services) {
      switch (service.type) {
        case "mileage":
          const res = await calcMileageMaintenanceAmount(service as MileageMaintenanceService)
          if (!res) return
          subtotal += res.subtotal
          disscount += res.subtotal
          total += res.subtotal
          break
        case "tires":
          total += calcTiresChangeAmount(service as TiresChangeService)
          break
        default:
          return undefined
      }
    }

    const amount: Amount = {
      subtotal: subtotal,
      disscount: disscount,
      total: total
    }

    console.log('amount', amount)
    return amount

  } catch (error) {
    console.log(error)
  }
}