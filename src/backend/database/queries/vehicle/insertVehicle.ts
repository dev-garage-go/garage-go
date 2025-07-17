import { removeDotsFromNumber } from "@/utils"
import { HttpStatus, ServerActionResponse } from "@/backend/types"
import { VehicleDataInterface, vehicleTypes, VehicleWithStringIDInterface } from "@/features/vehicle"

import { getCollection } from "@/backend/database"
import { VehicleDB } from '@/backend/database/types';
import { findVehicleByLicensePlate } from "./findVehicleByLicensePlate";

export const insertVehicle = async (vehicle: VehicleDataInterface): Promise<ServerActionResponse<VehicleWithStringIDInterface>> => {
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
    if (existVehicle.success && existVehicle.data) {
      const { _id: dbId, ...rest } = existVehicle.data;
      // converts _id in string 
      const clientVehicle: VehicleWithStringIDInterface = {
        _id: dbId.toString(),
        ...rest
      }

      return {
        data: clientVehicle,
        success: true,
        httpStatus: HttpStatus.CONFLICT,
        error: "vehicle already exist"
      }
    }

    const coll = await getCollection("vehicles")
    const result = await coll.insertOne(v)

    if (!coll || !result) throw new Error(`unexpected error creating a new car`)
    const newVehicle = await coll.findOne({ _id: result.insertedId })

    if (!newVehicle) return {
      success: false,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "error finding vehicle created"
    }

    // converts _id in string 
    const { _id: dbId, ...rest } = newVehicle;

    const clientVehicle: VehicleWithStringIDInterface = {
      _id: dbId.toString(),
      ...rest
    }
    return {
      success: true,
      httpStatus: HttpStatus.OK,
      data: clientVehicle
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