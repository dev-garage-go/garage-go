"use server"

import { licensePlateType, ServerVehicleResponse } from "@/features/vehicle"
import { ServerActionResponse } from "@/backend/types";
import { findVehicleByLicensePlate } from "@/backend/database/queries";

export const getVehicleByLicensePlate = async (licencePlate: licensePlateType): Promise<ServerActionResponse<ServerVehicleResponse | null>> => {
  return await findVehicleByLicensePlate(licencePlate)
}