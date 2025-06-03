"use server"

import { VehicleDataInterface } from "@/features/vehicle"
import { sleep } from "@/utils"

export const getVehicleByLicensePlate = async (licencePlate: string): Promise<VehicleDataInterface | null> => {
  try {
    const vehicle = "algo"
    // const vehicle = db.getVehicle(licensePlate)
    if (!vehicle) return null

    sleep(400)
    return {
      brand: "Audi",
      model: "A6 Turbo",
      licensePlate: "ABC123",
      mileage: "80000",
      year: "2015"
    }

    // return null

  } catch (error) {
    console.error(error)
    return null
  }
}