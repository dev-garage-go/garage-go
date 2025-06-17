"use server"

import { VehicleDB } from "@/backend/database/types"
import { VehicleDataInterface } from "@/features/vehicle"
import { ServerActionResponse } from "@/backend/types";
import { insertVehicle } from "@/backend/database/queries";

export const addNewVehicle = async (vehicle: VehicleDataInterface): Promise<ServerActionResponse<VehicleDB>> => {
  return await insertVehicle(vehicle)
}