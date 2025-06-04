"use server"

import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"
import { VehicleDataInterface } from "@/features/vehicle"
import { HttpStatus, ServerActionResponse } from "@/backend/types";

export const addNewVehicle = async (vehicle: VehicleDataInterface): Promise<ServerActionResponse<VehicleDB>> => {
  try {
    const coll = await getCollection("vehicles")
    const result = await coll.insertOne(vehicle)

    if (!coll || !result) throw new Error(`unexpected error creating a new car`)

    const newVehicle = await coll.findOne({ _id: result.insertedId })

    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: newVehicle
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      httpStatus: HttpStatus.BAD_REQUEST,
      error: `error creating new vehicle: ${error}`
    }
  }
}