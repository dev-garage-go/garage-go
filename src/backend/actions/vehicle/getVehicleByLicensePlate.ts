"use server"

import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"

export const getVehicleByLicensePlate = async (licencePlate: string): Promise<VehicleDB | null> => {
  try {
    const coll = await getCollection("vehicles")
    const vehicle = await coll.findOne({ licensePlate: licencePlate })

    if (!vehicle) return null
    return vehicle

  } catch (error) {
    console.error(error)
    return null
  }
}