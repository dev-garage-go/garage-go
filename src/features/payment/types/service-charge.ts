import { AmountInterface } from "@/features/bookings";
import { ServicesDataType, ServicesTypes } from "@/features/services";
import { VehicleWithStringIDInterface } from "@/features/vehicle";

export interface ServiceChargeInterface {
  service: ServicesDataType
  baseAmount: AmountInterface
}

export interface BaseChargeByVehicle {
  serviceType: ServicesTypes
  vehicle: VehicleWithStringIDInterface
}