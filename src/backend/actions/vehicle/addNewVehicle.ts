"use server"

import { VehicleDataInterface, ServerVehicleResponse } from "@/features/vehicle"
import { ServerActionResponse } from "@/backend/types";
import { insertVehicle } from "@/backend/database/queries";

export const addNewVehicle = async (vehicle: VehicleDataInterface): Promise<ServerActionResponse<ServerVehicleResponse>> => {
  return await insertVehicle(vehicle)
}