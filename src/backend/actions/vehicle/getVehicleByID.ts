"use server"

import { getCollection } from "@/backend/database"
import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { ServerVehicleResponse } from "@/features/vehicle";
import { ObjectId } from "mongodb";

export const getVehicleByID = async (id: ObjectId): Promise<ServerActionResponse<ServerVehicleResponse | null>> => {
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

    const { _id: dbId, ...rest } = vehicle;

    // converts _id in string 
    const clientVehicle: ServerVehicleResponse = {
      _id: dbId.toString(),
      ...rest
    }

    return {
      success: true,
      data: clientVehicle,
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