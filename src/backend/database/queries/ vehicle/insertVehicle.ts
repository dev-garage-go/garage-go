import { removeDotsFromNumber } from "@/utils"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { VehicleDataInterface, vehicleTypes } from "@/features/vehicle"

import { getCollection } from "@/backend/database"
import { VehicleDB } from '@/backend/database/types';
import { findVehicleByLicensePlate } from "./findVehicleByLicensePlate";

export const insertVehicle = async (vehicle: VehicleDataInterface): Promise<ServerActionResponse<VehicleDB>> => {
  try {
    const v: VehicleDB = {
      licensePlate: vehicle.licensePlate.toLowerCase().trim(),
      brand: vehicle.brand.toLowerCase().trim(),
      mileage: removeDotsFromNumber(vehicle.mileage).trim(),
      model: vehicle.model.toLowerCase(),
      year: removeDotsFromNumber(vehicle.year).trim(),
      type: vehicle.type.toLowerCase() as vehicleTypes
    }

    const existVehicle = await findVehicleByLicensePlate(v.licensePlate)
    if (!existVehicle.success) return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: existVehicle.error
    }

    // if exist a vehicle
    if (existVehicle.success && existVehicle.data) return {
      data: existVehicle.data,
      success: true,
      httpStatus: HttpStatus.CONFLICT,
      error: "vehicle already exist"
    }

    const coll = await getCollection("vehicles")
    const result = await coll.insertOne(v)

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