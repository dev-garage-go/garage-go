"use server"

import { getCollection } from "@/backend/database"
import { ErrorInterface, HttpStatus } from "@/backend/interfaces"
import { VehicleDataInterface } from "@/features/vehicle"

export const addNewVehicle = async (vehicle: VehicleDataInterface): Promise<ErrorInterface> => {
  try {
    const coll = await getCollection("vehicles")
    await coll.insertOne(vehicle)

    return {
      success: true,
      status: HttpStatus.OK,
      errorMessage: null
    }
  } catch (error) {
    console.error
    return {
      success: false,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage: `error creating a new vehicle ${error}`,
    }
  }
}