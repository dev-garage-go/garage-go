import { getCollection } from "@/backend/database"
import { ServerActionResponse, HttpStatus } from "@/backend/types"
import { licensePlateType, VehicleWithStringIDInterface } from "@/features/vehicle"

export const findVehicleByLicensePlate = async (licensePlate: licensePlateType): Promise<ServerActionResponse<VehicleWithStringIDInterface | null>> => {
  try {
    const coll = await getCollection("vehicles")
    const vehicle = await coll.findOne({ licensePlate: licensePlate.toLowerCase() })

    if (!vehicle) {
      return {
        success: true,
        data: null,
        httpStatus: HttpStatus.NOT_FOUND,
      }
    }

    const { _id: dbId, ...rest } = vehicle;

    // converts _id in string 
    const clientVehicle: VehicleWithStringIDInterface = {
      _id: dbId.toString(),
      ...rest
    }

    return {
      success: true,
      data: clientVehicle,
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
