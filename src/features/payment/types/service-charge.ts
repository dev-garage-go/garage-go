import { ServicesDataType, ServicesTypes } from "@/features/services";
import { VehicleWithStringIDInterface } from "@/features/vehicle";

export interface ServiceChargeInterface {
  service: ServicesDataType
  vehicle: VehicleWithStringIDInterface
}

export interface BaseChargeByVehicle {
  serviceType: ServicesTypes
  vehicle: VehicleWithStringIDInterface
}