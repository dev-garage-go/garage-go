import { VehicleDataInterface } from "@/features/vehicle"
import { ObjectId } from "mongodb"

export interface VehicleDB extends VehicleDataInterface {
  _id?: ObjectId
}