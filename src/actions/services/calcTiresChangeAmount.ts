'use server'

import { TiresChangeService } from "@/interfaces";

export const calcTiresChangeAmount = (service: TiresChangeService | any): number => {
  console.log(service)
  return 10
}