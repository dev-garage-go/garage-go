'use server'

import { Amount, TiresChangeService } from "@/interfaces";

export const calcTiresChangeAmount = async (service: TiresChangeService): Promise<Amount | undefined> => {
  try {
    console.log(service)

    return {
      subtotal: 1000,
      disscount: 0,
      total: 1000
    }

  } catch (error) {
    console.log(error)
  }
}