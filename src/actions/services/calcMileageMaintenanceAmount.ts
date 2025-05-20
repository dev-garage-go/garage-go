'use server'

import { MileageMaintenanceService } from "@/interfaces";

export const calcMileageMaintenanceAmount = (service: MileageMaintenanceService | any): number => {
  console.log(service)
  return 10
}