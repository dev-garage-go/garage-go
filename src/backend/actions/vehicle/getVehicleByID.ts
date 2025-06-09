"use server"

import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { ObjectId } from "mongodb";

export const getVehicleByID = async (id: ObjectId): Promise<ServerActionResponse<VehicleDB | null>> => {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        success: false,
        error: `Invalid ID format: ${id}`,
        httpStatus: HttpStatus.BAD_REQUEST
      }
    }

    const coll = await getCollection("vehicles")
    const vehicle = await coll.findOne({ _id: id })

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
      error: `unexpected error: ${error} getting vehicle by ID: ${id}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}