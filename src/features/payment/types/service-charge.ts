import { ServicesDataType } from "@/features/services";
import { VehicleWithStringIDInterface } from "@/features/vehicle";

export interface ServiceChargeInterface {
  service: ServicesDataType
  vehicle: VehicleWithStringIDInterface
}