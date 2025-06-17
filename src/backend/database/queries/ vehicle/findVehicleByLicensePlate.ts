import { getCollection } from "@/backend/database"
import { VehicleDB } from "@/backend/database/types"
import { ServerActionResponse, HttpStatus } from "@/backend/types"
import { licensePlateType } from "@/features/vehicle"

export const findVehicleByLicensePlate = async (licensePlate: licensePlateType): Promise<ServerActionResponse<VehicleDB | null>> => {
  try {
    const coll = await getCollection("vehicles")
    const vehicle = await coll.findOne({ licensePlate: licensePlate.toLowerCase() })

    console.log("DB Licenseplate: ", licensePlate)
    console.log("DB: ", vehicle)

    if (!vehicle) {
      return {
        success: true,
        data: null,
        httpStatus: HttpStatus.NOT_FOUND,
      }
    }

    return {
      success: true,
      data: vehicle,
      httpStatus: HttpStatus.OK,
    }
  } catch (error) {
    console.error("Error in findVehicleByLicensePlate:", error)
    return {
      success: false,
      error: `Unexpected error: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    }
  }
}
