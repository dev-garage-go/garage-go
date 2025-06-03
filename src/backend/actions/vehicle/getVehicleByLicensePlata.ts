"use server"

import { VehicleDataInterface } from "@/features/vehicle"

export const getVehicleByLicensePlate = async (licencePlate: string): Promise<VehicleDataInterface | null> => {
  try {
    const vehicle = "algo"
    // const vehicle = db.getVehicle(licensePlate)
    if (!vehicle) return null

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          brand: "Audi",
          model: "A6 Turbo",
          licensePlate: "ABC123",
          mileage: "80000",
          year: "2015"
        })
      }, 300)
    })

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(null)
    //   }, 300)
    // })

  } catch (error) {
    console.error(error)
    return null
  }
}