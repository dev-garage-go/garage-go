"use server"

import { ErrorInterface, HttpStatus } from "@/backend/interfaces"
import { VehicleDataInterface } from "@/features/vehicle"
import { sleep } from "@/utils"

export const addNewVehicle = async (data: VehicleDataInterface): Promise<ErrorInterface> => {
  try {
    // TODO: const newCar = await db.New(car)

    sleep(400)
    return {
      success: true,
      status: HttpStatus.OK,
      errorMessage: null
    }
  } catch (error) {
    console.error
    return {
      success: false,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage: `error creating a new vehicle ${error}`,
    }
  }
}