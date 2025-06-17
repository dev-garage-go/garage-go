"use server"

import { VehicleDB } from "@/backend/database/types"
import { licensePlateType } from "@/features/vehicle"
import { ServerActionResponse } from "@/backend/types";
import { findVehicleByLicensePlate } from "@/backend/database/queries";

export const getVehicleByLicensePlate = async (licencePlate: licensePlateType): Promise<ServerActionResponse<VehicleDB | null>> => {
  return await findVehicleByLicensePlate(licencePlate)
}