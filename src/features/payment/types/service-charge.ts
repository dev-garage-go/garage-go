import { ServicesDataType, ServicesTypes } from "@/features/services";
import { ServerVehicleResponse } from "@/features/vehicle";

export interface AmountInterface {
  subtotal: number
  disscount: number
  total: number
}

export interface ServiceChargeInterface {
  service: ServicesDataType
  baseAmount: AmountInterface
}

export interface BaseChargeByVehicle {
  serviceType: ServicesTypes
  vehicle: ServerVehicleResponse
}