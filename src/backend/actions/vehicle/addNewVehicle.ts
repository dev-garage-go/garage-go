"use server"

import { VehicleDataInterface, VehicleWithStringIDInterface } from "@/features/vehicle"
import { ServerActionResponse } from "@/backend/types";
import { insertVehicle } from "@/backend/database/queries";

export const addNewVehicle = async (vehicle: VehicleDataInterface): Promise<ServerActionResponse<VehicleWithStringIDInterface>> => {
  return await insertVehicle(vehicle)
}