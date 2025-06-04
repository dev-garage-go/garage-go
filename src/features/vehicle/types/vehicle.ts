import { z } from 'zod';

const licensePlate = z.string().min(6).max(6)

export type licensePlateType = z.infer<typeof licensePlate>;

export interface VehicleDataInterface {
  licensePlate: licensePlateType
  brand: string
  model: string
  year: string
  mileage: string
}

export interface VehicleWithStringIDInterface extends VehicleDataInterface {
  _id: string
}