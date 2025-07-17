import { getCollection } from "@/backend/database"
import { ServerActionResponse, HttpStatus } from "@/backend/types"
import { licensePlateType } from "@/features/vehicle"
import { findVehicleByLicensePlate } from "./findVehicleByLicensePlate"

export const deleteVehicle = async (licensePlate: licensePlateType): Promise<ServerActionResponse<null>> => {
  try {
    const validLicensePlate = licensePlate.toLowerCase().trim()

    const coll = await getCollection("vehicles")
    const hasVehicle = await findVehicleByLicensePlate(validLicensePlate)

    if (!hasVehicle) {
      return {
        success: true,
        data: null,
        httpStatus: HttpStatus.NOT_FOUND,
      }
    }

    await coll.deleteOne({ licensePlate: validLicensePlate })

    return {
      success: true,
      data: null,
      httpStatus: HttpStatus.OK,
    }
  } catch (error) {
    console.error("Error in deleteVehicle:", error)
    return {
      success: false,
      error: `Unexpected error: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    }
  }
}
