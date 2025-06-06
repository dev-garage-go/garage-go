import { z } from 'zod';
import { SelectOptions } from '../../../types/select';

const licensePlate = z.string().min(6).max(6)

export type licensePlateType = z.infer<typeof licensePlate>;
export type vehicleTypes = "city car / sedan" | "suv / camioneta" | "alta gama"

export interface VehicleDataInterface {
  licensePlate: licensePlateType
  brand: string
  model: string
  year: string
  mileage: string
  type: vehicleTypes
}

export interface VehicleWithStringIDInterface extends VehicleDataInterface {
  _id: string
}