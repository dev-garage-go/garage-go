"use server"

import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"
import { VehicleDataInterface } from "@/features/vehicle"

export const addNewVehicle = async (vehicle: VehicleDataInterface): Promise<VehicleDB | null> => {
  try {
    const coll = await getCollection("vehicles")
    const result = await coll.insertOne(vehicle)

    if (!coll || !result) throw new Error(`unexpected error creating a new car`)

    const newVehicle = await coll.findOne({ _id: result.insertedId })
    return newVehicle

  } catch (error) {
    console.error(error)
    return null
  }
}