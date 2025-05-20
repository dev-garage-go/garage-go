import { QuantityTires, TypesTiresOptions, VehicleMileages } from "@/interfaces"
import { Promotion } from "../../interfaces/shared/promotions"

export interface BaseService {
  name: string
  price: number
  promotion?: Promotion
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
