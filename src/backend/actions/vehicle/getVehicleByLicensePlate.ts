"use server"

import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"
import { licensePlateType } from "@/features/vehicle"
import { HttpStatus, ServerActionResponse } from "@/backend/types";

export const getVehicleByLicensePlate = async (licencePlate: licensePlateType): Promise<ServerActionResponse<VehicleDB>> => {
  try {
    const coll = await getCollection("vehicles")
    const vehicle = await coll.findOne({ licensePlate: licencePlate })

    if (!vehicle) throw new Error(`vehicle with license plate: ${licencePlate} not found`)

    return {
      success: true,
      data: vehicle,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: ``,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}