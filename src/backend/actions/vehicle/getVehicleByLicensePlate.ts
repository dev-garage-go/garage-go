"use server"

import { licensePlateType, VehicleWithStringIDInterface } from "@/features/vehicle"
import { ServerActionResponse } from "@/backend/types";
import { findVehicleByLicensePlate } from "@/backend/database/queries";

export const getVehicleByLicensePlate = async (licencePlate: licensePlateType): Promise<ServerActionResponse<VehicleWithStringIDInterface | null>> => {
  return await findVehicleByLicensePlate(licencePlate)
}