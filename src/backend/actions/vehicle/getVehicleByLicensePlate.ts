"use server"

import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"
import { licensePlateType } from "@/features/vehicle"
import { HttpStatus, ServerActionResponse } from "@/backend/types";

export const getVehicleByLicensePlate = async (licencePlate: licensePlateType): Promise<ServerActionResponse<VehicleDB | null>> => {
  try {
    const coll = await getCollection("vehicles")
    const vehicle = await coll.findOne({ licensePlate: licencePlate })

    if (!vehicle) {
      return {
        success: true,
        data: null,
        httpStatus: HttpStatus.NOT_FOUND
      }
    }

    return {
      success: true,
      data: vehicle,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `unexpected error: ${error} getting vehicle by licence plate: ${licencePlate}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}