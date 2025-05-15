import { QuantityTires, TypesTiresOptions, VehicleMileages } from "@/interfaces"

export interface BaseService {
  name: string
  price: number
}

export interface TiresChangeService extends BaseService {
  type: 'tires'
  tiresQuantity: QuantityTires
  tiresSize: string
  tiresType: TypesTiresOptions
}

export interface OilChangeService extends BaseService {
  type: 'oil'
  vehicleMileage: VehicleMileages
}

// main type - is used in Booking collection
export type Services = TiresChangeService | OilChangeService
